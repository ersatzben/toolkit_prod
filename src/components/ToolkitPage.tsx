import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { parse } from 'yaml';
import { useParams, useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import type { Tool, TagsList, Objective, TermsList } from '../types/Tool';
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
import { media } from '../styles/foundations/breakpoints';
import { Page } from './Page';

interface ObjectiveGroup {
  group: string;
  objectives: Objective[];
}

// Responsive splash message
const ResponsiveMessage = styled.p`
  font-size: 1.2rem;
  color: #6c757d;
  
  &::before {
    content: "☰  Use the menu above to choose a tool and learn more…";
  }
  
  ${media.minTablet} {
    &::before {
      content: "◀  Choose a tool from the left to learn more…";
    }
  }
`;

// Main content components for different routes
const SplashMessage = () => (
  <Section style={{ textAlign: 'center', marginTop: '40px' }}>
      <ResponsiveMessage />
  </Section>
);

const UserGuide: React.FC = () => (
  <Section>
    <PageTitle>How to use this toolkit</PageTitle>
    <MarkdownText>
      <p>
        This toolkit provides comprehensive analysis of innovation policy instruments 
        to help policymakers make evidence-based decisions about R&D investment and innovation support.
      </p>
      
      <h2>Getting Started</h2>
      <p>
        Browse the policy tools using the sidebar filters, or use the R&D calculator 
        to estimate returns on research investment.
      </p>
      
      <h2>Understanding the Analysis</h2>
      <p>
        Each tool includes effectiveness analysis, implementation guidance, and 
        recommendations based on international evidence and UK-specific context.
      </p>
      
      <h2>Using the Calculator</h2>
      <p>
        The R&D investment calculator uses the perpetual inventory method to 
        estimate benefit-cost ratios for both private and public R&D spending.
      </p>
    </MarkdownText>
  </Section>
);

const ToolView: React.FC<{
  tools: Tool[];
  allObjectives: Objective[];
  tagsList: TagsList | null;
  termsList: TermsList;
  onSelectObjective: (objective: Objective) => void;
  onAddFilter: (tag: string) => void;
  onOpenMobileSidebar: () => void;
}> = ({ tools, allObjectives, tagsList, termsList, onSelectObjective, onAddFilter, onOpenMobileSidebar }) => {
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
      tagsList={tagsList}
      termsList={termsList}
      onSelectObjective={onSelectObjective} 
      objectives={allObjectives}
      onAddFilter={onAddFilter}
      onOpenMobileSidebar={onOpenMobileSidebar}
    />
  );
};

interface ToolkitData {
  tools: Tool[];
  tagsList: TagsList;
  objectives: Objective[];
  termsList: TermsList;
}

export const ToolkitPage: React.FC = () => {

  const [toolkitData, setToolkitData] = useState<ToolkitData>({
    tools: [],
    tagsList: { tags: { objectives: [], innovation_stage: [], sectors: [], delivery_mechanism: [], targeting: [], timeline: [] } },
    objectives: [],
    termsList: {},
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [loadingError, setLoadingError] = useState<string | null>(null);
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
        const [toolsResponse, tagsResponse, objectivesGroupedResponse, termsResponse] = await Promise.all([
          fetch('/tools_v5.yaml'),
          fetch('/tags_list.yaml'),
          fetch('/objectives_grouped.yaml'),
          fetch('/terms.yaml'),
        ]);
        
        const [toolsYaml, tagsYaml, objectivesGroupedYaml, termsYaml] = await Promise.all([
          toolsResponse.text(),
          tagsResponse.text(),
          objectivesGroupedResponse.text(),
          termsResponse.text(),
        ]);

        const toolsData = parse(toolsYaml);
        const tagsData = parse(tagsYaml);
        const objectivesGroupedData = parse(objectivesGroupedYaml);
        const termsData = parse(termsYaml);
        console.log(termsData);

        const slugify = (str: string) =>
          str
            .toLowerCase()
            .replace(/&/g, 'and')
            .replace(/[^a-z0-9]+/g, '_')
            .replace(/^_+|_+$/g, '');

        const toolsWithTag = toolsData.tools.map((t: Tool) => ({
          ...t,
          tag: t.tag || slugify(t.name),
        }));

        setToolkitData(prev => ({
          ...prev,
          tools: toolsWithTag,
          tagsList: tagsData,
          objectives: objectivesGroupedData.objective_groups.reduce((acc: Objective[], group: ObjectiveGroup) => {
            return acc.concat(group.objectives);
          }, []),
          termsList: termsData.terms,
        }));

      } catch (error) {
        console.error(error);
        setLoadingError('Failed to load toolkit data. Please refresh the page to try again.');
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

  const filteredTools = toolkitData.tools
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
                {toolkitData.tagsList?.tags.objectives.find(t => t.tag === filter)?.name || 
                 toolkitData.tagsList?.tags.innovation_stage.find(t => t.tag === filter)?.name || 
                 toolkitData.tagsList?.tags.sectors.find(t => t.tag === filter)?.name || 
                 toolkitData.tagsList?.tags.delivery_mechanism.find(t => t.tag === filter)?.name ||
                 toolkitData.tagsList?.tags.targeting.find(t => t.tag === filter)?.name ||
                 toolkitData.tagsList?.tags.timeline.find(t => t.tag === filter)?.name || 
                 filter}
                <RemoveChipButton onClick={() => removeFilter(filter)}>x</RemoveChipButton>
              </FilterChip>
            ))}
          </FilterChipContainer>
        )}
        <FilterInterface
          tagsList={toolkitData.tagsList}
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
                  {toolkitData.tagsList?.tags.objectives.find(t => t.tag === filter)?.name || 
                   toolkitData.tagsList?.tags.innovation_stage.find(t => t.tag === filter)?.name || 
                   toolkitData.tagsList?.tags.sectors.find(t => t.tag === filter)?.name || 
                   toolkitData.tagsList?.tags.delivery_mechanism.find(t => t.tag === filter)?.name ||
                   toolkitData.tagsList?.tags.targeting.find(t => t.tag === filter)?.name ||
                   toolkitData.tagsList?.tags.timeline.find(t => t.tag === filter)?.name || 
                   filter}
                  <RemoveChipButton onClick={() => removeFilter(filter)}>x</RemoveChipButton>
                </FilterChip>
              ))}
            </FilterChipContainer>
          )}
          <FilterInterface
            tagsList={toolkitData.tagsList}
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
        {loadingError && (
          <div style={{
            padding: '1rem',
            margin: '1rem',
            backgroundColor: '#fee',
            border: '1px solid #f88',
            borderRadius: '4px',
            color: '#800'
          }}>
            <strong>Error:</strong> {loadingError}
          </div>
        )}
        <Routes>
          <Route path="/" element={<SplashMessage />} />
          <Route path="/guide" element={<UserGuide />} />
          <Route 
            path="/tool/:tag" 
            element={
              <ToolView 
                tools={toolkitData.tools}
                allObjectives={toolkitData.objectives}
                tagsList={toolkitData.tagsList}
                termsList={toolkitData.termsList}
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