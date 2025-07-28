import React, { useState, useEffect, useRef } from 'react';
import { parse } from 'yaml';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Tool, TagsList, Objective, SelectedItem, ItemType } from '../types/Tool';
import { ToolDetail } from './ToolDetail';
import { ObjectiveDetail } from './ObjectiveDetail';
import {
  ContentRow,
  Sidebar,
  MainContent,
  ToolList,
  ToolListItem,
  SidebarTitle,
  SidebarSection,
  FilterBarContainer,
  SearchInput,
  FilterChipContainer,
  FilterChip,
  RemoveChipButton,
  ClearFiltersButton,
  PageTitle,
  Section,
  MarkdownText,
  SidebarSubheading
} from '../styles/StyledComponents';

interface ObjectiveGroup {
  group: string;
  objectives: Objective[];
}

export const ToolkitPage: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [objectiveGroups, setObjectiveGroups] = useState<ObjectiveGroup[]>([]);
  const [allObjectives, setAllObjectives] = useState<Objective[]>([]);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);
  const [selectedItemType, setSelectedItemType] = useState<ItemType>(null);
  const [tagsList, setTagsList] = useState<TagsList | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showUserGuide, setShowUserGuide] = useState(false);
  const [guideHtml, setGuideHtml] = useState<string>('');
  const [collapsedSections, setCollapsedSections] = useState<{ tools: boolean }>({ tools: false });
  const mainContentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [toolsResponse, tagsResponse, objectivesGroupedResponse] = await Promise.all([
          fetch('/tools_v5.yaml'),
          fetch('/tags_list.yaml'),
          fetch('/objectives_grouped.yaml'),
        ]);
        
        const [toolsYaml, tagsYaml, objectivesGroupedYaml] = await Promise.all([
          toolsResponse.text(),
          tagsResponse.text(),
          objectivesGroupedResponse.text(),
        ]);

        const toolsData = parse(toolsYaml);
        const tagsData = parse(tagsYaml);
        const objectivesGroupedData = parse(objectivesGroupedYaml);

        const slugify = (str: string) =>
          str
            .toLowerCase()
            .replace(/&/g, 'and')
            .replace(/[^a-z0-9]+/g, '_')
            .replace(/^_+|_+$/g, '');

        const toolsWithTag = toolsData.tools.map((t: any) => ({
          ...t,
          tag: t.tag || slugify(t.name),
        }));

        setTools(toolsWithTag);
        setTagsList(tagsData);
        setObjectiveGroups(objectivesGroupedData.objective_groups);

        const currentAllObjectives = objectivesGroupedData.objective_groups.reduce((acc: Objective[], group: ObjectiveGroup) => {
          return acc.concat(group.objectives);
        }, []);
        setAllObjectives(currentAllObjectives);

        const hash = location.hash.substring(1);
        if (hash) {
          if (hash === 'guide') {
            setShowUserGuide(true);
            setSelectedItem(null);
            setSelectedItemType(null);
            const guideResponse = await fetch('/guide.html');
            const guideText = await guideResponse.text();
            setGuideHtml(guideText);
            return;
          }
          
          const [type, tag] = hash.split(':');
          if (type === 'tool' && toolsWithTag) {
            const toolFromHash = toolsWithTag.find((t: Tool) => t.tag === tag);
            if (toolFromHash) {
              setSelectedItem(toolFromHash);
              setSelectedItemType('tool');
              setShowUserGuide(false);
              return;
            }
          } else if (type === 'objective' && currentAllObjectives) {
            const objectiveFromHash = currentAllObjectives.find((o: Objective) => o.tag === tag);
            if (objectiveFromHash) {
              setSelectedItem(objectiveFromHash);
              setSelectedItemType('objective');
              setShowUserGuide(false);
              return;
            }
          }
        }
        
        if (toolsWithTag.length === 0 && currentAllObjectives.length === 0) {
          setShowUserGuide(true);
          const guideResponse = await fetch('/guide.html');
          const guideText = await guideResponse.text();
          setGuideHtml(guideText);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        setShowUserGuide(true);
        try {
            const guideResponse = await fetch('/guide.html');
            const guideText = await guideResponse.text();
            setGuideHtml(guideText);
        } catch (guideError) {
            console.error('Error loading guide HTML:', guideError);
            setGuideHtml('<p>Error loading user guide. Please try again later.</p>');
        }
      }
    };

    loadData();
  }, [location.hash]);

  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo(0, 0);
    }
  }, [selectedItem, selectedItemType, showUserGuide]);

  const addFilter = (tag: string) => {
    if (!activeFilters.includes(tag)) {
      setActiveFilters([...activeFilters, tag]);
      setShowUserGuide(false);
    }
  };

  const removeFilter = (tagToRemove: string) => {
    setActiveFilters(activeFilters.filter(tag => tag !== tagToRemove));
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setActiveFilters([]);
  };

  const filteredTools = tools
    .filter(tool => {
      if (activeFilters.length === 0) return true;
      const toolTags = [
        ...(tool.tags.objectives || []),
        ...(tool.tags.innovation_stage || []),
        ...(tool.tags.sectors || []),
        ...(tool.tags.targeting || []),
        ...(tool.tags.timeline || []),
      ];
      return activeFilters.every(filterTag => toolTags.includes(filterTag));
    })
    .filter(tool => 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleSelectTool = (tool: Tool) => {
    setSelectedItem(tool);
    setSelectedItemType('tool');
    setShowUserGuide(false);
    navigate(`#tool:${tool.tag}`);
    setCollapsedSections(prev => ({ ...prev, tools: false }));
  };

  const handleSelectObjective = (objective: Objective) => {
    setSelectedItem(objective);
    setSelectedItemType('objective');
    setShowUserGuide(false);
    navigate(`#objective:${objective.tag}`);
  };

  const toggleSidebarSection = (section: 'tools') => {
    setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const SplashMessage = () => (
    <Section style={{ textAlign: 'center', marginTop: '40px' }}>
        <p style={{ fontSize: '1.2rem', color: '#6c757d' }}>
          ◀  Choose a tool from the left to learn more…
        </p>
    </Section>
  );

  return (
    <ContentRow>
      <Sidebar>
        <FilterBarContainer>
          <SearchInput 
            type="text" 
            name="search" 
            id="search-input" 
            placeholder="Search tools..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          {activeFilters.length > 0 && (
            <ClearFiltersButton onClick={clearAllFilters}>Clear All Filters</ClearFiltersButton>
          )}
        </FilterBarContainer>
        {(searchTerm || activeFilters.length > 0) && (
          <FilterChipContainer>
            {activeFilters.map(filter => (
              <FilterChip key={filter}>
                {tagsList?.tags.objectives.find(t => t.tag === filter)?.name || 
                 tagsList?.tags.innovation_stage.find(t => t.tag === filter)?.name || 
                 tagsList?.tags.sectors.find(t => t.tag === filter)?.name || 
                 tagsList?.tags.delivery_mechanism.find(t => t.tag === filter)?.name ||
                 tagsList?.tags.targeting.find(t => t.tag === filter)?.name ||
                 tagsList?.tags.timeline.find(t => t.tag === filter)?.name || 
                 filter}
                <RemoveChipButton onClick={() => removeFilter(filter)}>x</RemoveChipButton>
              </FilterChip>
            ))}
          </FilterChipContainer>
        )}
        <SidebarSection itemType="tool">
          <SidebarTitle itemType="tool" onClick={() => toggleSidebarSection('tools')}>
            Policy Tools {collapsedSections.tools ? '►' : '▼'}
          </SidebarTitle>
          {!collapsedSections.tools && (
            <ToolList>
              {filteredTools.map((tool) => (
                <ToolListItem
                  key={tool.tag}
                  active={!showUserGuide && selectedItemType === 'tool' && selectedItem?.tag === tool.tag}
                  onClick={() => handleSelectTool(tool)}
                >
                  {tool.name}
                </ToolListItem>
              ))}
            </ToolList>
          )}
        </SidebarSection>
      </Sidebar>
      <MainContent ref={mainContentRef}>
        {showUserGuide && guideHtml && (
          <Section>
            <PageTitle>How to use this toolkit</PageTitle>
            <MarkdownText dangerouslySetInnerHTML={{ __html: guideHtml }} />
          </Section>
        )}
        {!showUserGuide && !selectedItem && <SplashMessage />}
        {!showUserGuide && selectedItem && selectedItemType === 'tool' && tagsList && (
          <ToolDetail 
            tool={selectedItem as Tool} 
            onSelectObjective={handleSelectObjective} 
            tagsList={tagsList}
            objectives={allObjectives}
            onAddFilter={addFilter}
          />
        )}
        {!showUserGuide && selectedItem && selectedItemType === 'objective' && (
          <ObjectiveDetail objective={selectedItem as Objective} tools={tools} onSelectTool={handleSelectTool}/>
        )}
      </MainContent>
    </ContentRow>
  );
}; 