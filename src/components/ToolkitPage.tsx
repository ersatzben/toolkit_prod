import React, { useState, useEffect, useRef } from 'react';
import { parse } from 'yaml';
import { useParams, useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import type { Tool, TagsList, Objective } from '../types/Tool';
import { ToolDetail } from './ToolDetail';
import { FilterInterface } from './FilterInterface';
import {
  ContentRow,
  Sidebar,
  MainContent,
  MobileToolbar,
  MobileToolbarTitle,
  MobileToolbarButton,
  MobileSidebarContainer,
  MobileSidebarOverlay,
  MobileSidebarHeader,
  MobileSidebarTitle,
  MobileSidebarCloseButton,
  MobileSidebarContent,
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
} from '../styles/StyledComponents';
import { Page } from './Page';

interface ObjectiveGroup {
  group: string;
  objectives: Objective[];
}

// Main content components for different routes
const SplashMessage = () => (
  <Section style={{ textAlign: 'center', marginTop: '40px' }}>
      <p style={{ fontSize: '1.2rem', color: '#6c757d' }}>
        ◀  Choose a tool from the left to learn more…
      </p>
  </Section>
);

const UserGuide: React.FC<{ guideHtml: string }> = ({ guideHtml }) => (
  <Section>
    <PageTitle>How to use this toolkit</PageTitle>
    <MarkdownText dangerouslySetInnerHTML={{ __html: guideHtml }} />
  </Section>
);

const ToolView: React.FC<{
  tools: Tool[];
  allObjectives: Objective[];
  tagsList: TagsList | null;
  onSelectObjective: (objective: Objective) => void;
  onAddFilter: (tag: string) => void;
  onOpenMobileSidebar: () => void;
}> = ({ tools, allObjectives, tagsList, onSelectObjective, onAddFilter, onOpenMobileSidebar }) => {
  const { tag } = useParams<{ tag: string }>();
  const tool = tools.find(t => t.tag === tag);
  
  // Scroll to top when tool changes
  useEffect(() => {
    if (tool) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [tag, tool]);
  
  if (!tool || !tagsList) {
    return <div>Tool not found</div>;
  }
  
  return (
    <ToolDetail 
      tool={tool} 
      onSelectObjective={onSelectObjective} 
      tagsList={tagsList}
      objectives={allObjectives}
      onAddFilter={onAddFilter}
      onOpenMobileSidebar={onOpenMobileSidebar}
    />
  );
};


export const ToolkitPage: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [, setObjectiveGroups] = useState<ObjectiveGroup[]>([]);
  const [allObjectives, setAllObjectives] = useState<Objective[]>([]);
  const [tagsList, setTagsList] = useState<TagsList | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [guideHtml, setGuideHtml] = useState<string>('');
  const [collapsedSections, setCollapsedSections] = useState<{ tools: boolean }>({ tools: false });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [toolsResponse, tagsResponse, objectivesGroupedResponse, guideResponse] = await Promise.all([
          fetch('/tools_v5.yaml'),
          fetch('/tags_list.yaml'),
          fetch('/objectives_grouped.yaml'),
          fetch('/guide.html'),
        ]);
        
        const [toolsYaml, tagsYaml, objectivesGroupedYaml, guideText] = await Promise.all([
          toolsResponse.text(),
          tagsResponse.text(),
          objectivesGroupedResponse.text(),
          guideResponse.text(),
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
        setGuideHtml(guideText);

        const currentAllObjectives = objectivesGroupedData.objective_groups.reduce((acc: Objective[], group: ObjectiveGroup) => {
          return acc.concat(group.objectives);
        }, []);
        setAllObjectives(currentAllObjectives);

      } catch (error) {
        console.error('Error loading data:', error);
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
  }, []);

  const addFilter = (tag: string) => {
    if (!activeFilters.includes(tag)) {
      setActiveFilters([...activeFilters, tag]);
    }
  };

  const removeFilter = (tagToRemove: string) => {
    setActiveFilters(activeFilters.filter(tag => tag !== tagToRemove));
  };

  const toggleFilter = (tag: string) => {
    if (activeFilters.includes(tag)) {
      removeFilter(tag);
    } else {
      addFilter(tag);
    }
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
    navigate(`/toolkit/tool/${tool.tag}`);
    setCollapsedSections(prev => ({ ...prev, tools: false }));
  };

  const handleSelectObjective = (objective: Objective) => {
    navigate(`/toolkit/objective/${objective.tag}`);
  };

  const toggleSidebarSection = (section: 'tools') => {
    setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Page 
      title="UK R&D Policy Toolkit"
      subtitle="Learn about R&D Policy Tools"
    >
      <MobileToolbar>
        <MobileToolbarTitle>Policy Tools</MobileToolbarTitle>
        <MobileToolbarButton onClick={handleSidebarToggle}>
          ☰ Browse Tools
        </MobileToolbarButton>
      </MobileToolbar>
      
      {sidebarOpen && (
        <>
          <MobileSidebarOverlay onClick={() => setSidebarOpen(false)} />
          <MobileSidebarContainer>
        <MobileSidebarHeader>
          <MobileSidebarTitle>Policy Tools</MobileSidebarTitle>
          <MobileSidebarCloseButton onClick={() => setSidebarOpen(false)}>
            ×
          </MobileSidebarCloseButton>
        </MobileSidebarHeader>
        <MobileSidebarContent>
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
        <FilterInterface
          tagsList={tagsList}
          activeFilters={activeFilters}
          onFilterToggle={toggleFilter}
        />
        <SidebarSection itemType="tool">
          <ToolList>
              {filteredTools.map((tool) => (
                <ToolListItem
                  key={tool.tag}
                  active={location.pathname === `/toolkit/tool/${tool.tag}`}
                  onClick={() => {
                    handleSelectTool(tool);
                    setSidebarOpen(false); // Close mobile sidebar when tool is selected
                  }}
                >
                  {tool.name}
                </ToolListItem>
              ))}
            </ToolList>
          </SidebarSection>
        </MobileSidebarContent>
        </MobileSidebarContainer>
        </>
      )}

      <ContentRow>
        <Sidebar>
          <FilterBarContainer>
            <SearchInput 
              type="text" 
              name="search" 
              id="search-input-desktop" 
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
          <FilterInterface
            tagsList={tagsList}
            activeFilters={activeFilters}
            onFilterToggle={toggleFilter}
          />
          <SidebarSection itemType="tool">
            <SidebarTitle itemType="tool" onClick={() => toggleSidebarSection('tools')}>
              Policy Tools {collapsedSections.tools ? '►' : '▼'}
            </SidebarTitle>
            {!collapsedSections.tools && (
              <ToolList>
                {filteredTools.map((tool) => (
                  <ToolListItem
                    key={tool.tag}
                    active={location.pathname === `/toolkit/tool/${tool.tag}`}
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
        <Routes>
          <Route path="/" element={<SplashMessage />} />
          <Route path="/guide" element={<UserGuide guideHtml={guideHtml} />} />
          <Route 
            path="/tool/:tag" 
            element={
              <ToolView 
                tools={tools}
                allObjectives={allObjectives}
                tagsList={tagsList}
                onSelectObjective={handleSelectObjective}
                onAddFilter={addFilter}
                onOpenMobileSidebar={() => setSidebarOpen(true)}
              />
            } 
          />
        </Routes>
      </MainContent>
    </ContentRow>
    </Page>
  );
}; 