import React, { useState } from 'react';
import type { Tool, TagsList, Objective, TermsList } from '../types/Tool';
import {
  Section,
  SectionTitle,
  SubSection,
  SubSectionTitle,
  TagContainer,
  Tag,
  TargetabilityGrid,
  TargetabilityBox,
  MarkdownText,
  TitleContainer,
  ItemTypeIndicator,
  PageTitle,
  Tooltip,
} from '../styles/StyledComponents';
import { MarkdownWithTerms } from './Markdown/MarkdownRenderer';
import { ReferenceCard } from './ReferenceCard';

interface ToolDetailProps {
  tool: Tool;
  tagsList: TagsList;
  objectives: Objective[];
  termsList: TermsList;
  onSelectObjective: (objective: Objective) => void;
  onAddFilter: (tag: string) => void;
  onOpenMobileSidebar: () => void;
}

export const ToolDetail: React.FC<ToolDetailProps> = ({ tool, tagsList, objectives, termsList, onAddFilter, onOpenMobileSidebar }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const getTagName = (category: keyof TagsList['tags'], tag: string) => {
    const foundTag = tagsList.tags[category].find(t => t.tag === tag);
    return foundTag ? foundTag.name : tag;
  };

  const getObjectiveByTag = (tag: string): Objective | undefined => {
    return objectives.find(o => o.tag === tag);
  };

  const handleFilterClick = (tag: string) => {
    onAddFilter(tag);
    // Open mobile sidebar when filter is clicked on mobile
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      onOpenMobileSidebar();
    }
  };

  const handleTooltipClick = (tagString: string) => {
    // Toggle tooltip on mobile
    setActiveTooltip(activeTooltip === tagString ? null : tagString);
  };

  const renderList = (items?: string[]) => {
    if (!items || items.length === 0) return <p>N/A</p>;
    return (
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>
            <MarkdownWithTerms markdown={item} termsList={termsList} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <TitleContainer>
        <PageTitle>{tool.name}</PageTitle>
        <ItemTypeIndicator itemType="tool">Tool</ItemTypeIndicator>
      </TitleContainer>

      {/* Overall Assessment */}
      {tool.overall_assessment && (
        <Section>
          <SectionTitle itemType="tool">Overall Assessment</SectionTitle>
          <MarkdownText variant="large">
            <MarkdownWithTerms markdown={tool.overall_assessment} termsList={termsList} />
          </MarkdownText>
        </Section>
      )}

      {/* How It Works */}
      {tool.how_it_works && (
        <Section>
          <SectionTitle itemType="tool">How It Works</SectionTitle>
          {tool.how_it_works.description && (
            <SubSection>
              <SubSectionTitle itemType="tool">Description</SubSectionTitle>
              <MarkdownText>
                <MarkdownWithTerms markdown={tool.how_it_works.description} termsList={termsList} />
              </MarkdownText>
            </SubSection>
          )}
          {tool.how_it_works.mechanism && (
            <SubSection>
              <SubSectionTitle itemType="tool">Mechanism</SubSectionTitle>
              <MarkdownText>
                <MarkdownWithTerms markdown={tool.how_it_works.mechanism} termsList={termsList} />
              </MarkdownText>
            </SubSection>
          )}
          {(tool.how_it_works.complexity || tool.how_it_works.complexity_details) && (
            <SubSection>
              <SubSectionTitle itemType="tool">Complexity</SubSectionTitle>
              <MarkdownText>
                <MarkdownWithTerms markdown={`**${tool.how_it_works.complexity || ''}** – ${tool.how_it_works.complexity_details || ''}`} termsList={termsList} />
              </MarkdownText>
            </SubSection>
          )}
          {(tool.how_it_works.flexibility || tool.how_it_works.flexibility_details) && (
            <SubSection>
              <SubSectionTitle itemType="tool">Flexibility</SubSectionTitle>
              <MarkdownText>
                <MarkdownWithTerms markdown={`**${tool.how_it_works.flexibility || ''}** – ${tool.how_it_works.flexibility_details || ''}`} termsList={termsList} />
              </MarkdownText>
            </SubSection>
          )}
        </Section>
      )}

      {/* Effectiveness and UK Impact */}
      {tool.effectiveness_and_uk_impact && (
        <Section>
          <SectionTitle itemType="tool">Effectiveness and UK Impact</SectionTitle>
          {tool.effectiveness_and_uk_impact.evidence_summary && (
            <SubSection>
              <SubSectionTitle itemType="tool">Evidence Summary</SubSectionTitle>
              <MarkdownText>
                  <MarkdownWithTerms markdown={tool.effectiveness_and_uk_impact.evidence_summary} termsList={termsList} />
              </MarkdownText>
            </SubSection>
          )}
          <SubSection>
            <SubSectionTitle itemType="tool">What Works</SubSectionTitle>
            {renderList(tool.effectiveness_and_uk_impact.what_works)}
          </SubSection>
          <SubSection>
            <SubSectionTitle itemType="tool">What Doesn't Work</SubSectionTitle>
            {renderList(tool.effectiveness_and_uk_impact.what_doesnt_work)}
          </SubSection>
          {tool.effectiveness_and_uk_impact.time_to_impact && (
            <SubSection>
              <SubSectionTitle itemType="tool">Time to Impact</SubSectionTitle>
              <MarkdownText>
                <MarkdownWithTerms markdown={tool.effectiveness_and_uk_impact.time_to_impact} termsList={termsList} />
              </MarkdownText>
            </SubSection>
          )}
        </Section>
      )}

      {/* Targetability */}
      {tool.targetability && (
        <Section>
          <SectionTitle itemType="tool">Targetability</SectionTitle>
          <TargetabilityGrid>
            <TargetabilityBox>
              <SubSectionTitle itemType="tool">Sectoral</SubSectionTitle>
              {tool.targetability.sectoral ? (
                <MarkdownText>
                  <MarkdownWithTerms markdown={`**${tool.targetability.sectoral.level || ''}** – ${tool.targetability.sectoral.details || ''}`} termsList={termsList} />
                </MarkdownText>
              ) : (
                <p>N/A</p>
              )}
            </TargetabilityBox>
            <TargetabilityBox>
              <SubSectionTitle itemType="tool">Technological</SubSectionTitle>
              {tool.targetability.technological ? (
                <MarkdownText>
                  <MarkdownWithTerms markdown={`**${tool.targetability.technological.level || ''}** – ${tool.targetability.technological.details || ''}`} termsList={termsList} />
                </MarkdownText>
              ) : (
                <p>N/A</p>
              )}
            </TargetabilityBox>
            <TargetabilityBox>
              <SubSectionTitle itemType="tool">Regional</SubSectionTitle>
              {tool.targetability.regional ? (
                <MarkdownText>
                  <MarkdownWithTerms markdown={`**${tool.targetability.regional.level || ''}** – ${tool.targetability.regional.details || ''}`} termsList={termsList} />
                </MarkdownText>
              ) : (
                <p>N/A</p>
              )}
            </TargetabilityBox>
            <TargetabilityBox>
              <SubSectionTitle itemType="tool">By Firm Type</SubSectionTitle>
              {tool.targetability.by_firm_type ? (
                <MarkdownText>
                  <MarkdownWithTerms markdown={`**${tool.targetability.by_firm_type.level || ''}** – ${tool.targetability.by_firm_type.details || ''}`} termsList={termsList} />
                </MarkdownText>
              ) : (
                <p>N/A</p>
              )}
            </TargetabilityBox>
          </TargetabilityGrid>
          {tool.targetability.overall_assessment && (
            <SubSection style={{ marginTop: '20px' }}>
              <SubSectionTitle itemType="tool">Targetability Assessment</SubSectionTitle>
              <MarkdownText>
                <MarkdownWithTerms markdown={tool.targetability.overall_assessment} termsList={termsList} />
              </MarkdownText>
            </SubSection>
          )}
        </Section>
      )}

      {tool.economic_analysis && (
        <Section>
          <SectionTitle itemType="tool">Economic Analysis</SectionTitle>
          <MarkdownText>
            <MarkdownWithTerms markdown={tool.economic_analysis} termsList={termsList} />
          </MarkdownText>
        </Section>
      )}

      {/* CBP View */}
      {tool.cbp_view_recommendations_for_uk && (
        <Section color="blue">
          <SectionTitle itemType="tool">Recommendations for the UK (Centre for British Progress view)</SectionTitle>
          <MarkdownText>
            <MarkdownWithTerms markdown={tool.cbp_view_recommendations_for_uk} termsList={termsList} />
          </MarkdownText>
        </Section>
      )}

      {/* Further Reading */}
      {tool.further_reading && tool.further_reading.length > 0 && (
        <Section>
          <SectionTitle itemType="tool">Further Reading</SectionTitle>
          {tool.further_reading.map((item, index) => (
            <ReferenceCard key={index} reference={{
              authors: item.author || '',
              title: item.title,
              url: item.url
            }} />
          ))}
          
        </Section>
      )}

      {/* Related Policy Objectives */}
      {tool.tags?.objectives && tool.tags.objectives.length > 0 && (
        <Section>
          <SectionTitle itemType="tool">Related Policy Objectives</SectionTitle>
          <TagContainer>
            {tool.tags.objectives.map((tagString, index) => {
              const objective = getObjectiveByTag(tagString);
              const tagName = getTagName('objectives', tagString);
              return (
                <Tooltip key={index} className={activeTooltip === tagString ? 'mobile-active' : ''}>
                  <Tag
                    itemType="tool"
                    onClick={() => handleTooltipClick(tagString)}
                    style={{ cursor: 'pointer' }}
                  >
                    {tagName}
                  </Tag>
                  {objective && (
                    <span className="tooltiptext">
                      {objective.description}
                    </span>
                  )}
                </Tooltip>
              );
            })}
          </TagContainer>
        </Section>
      )}

      {/* Filter Tags Section */}
      <Section variant="filter">
        <SubSection variant="filter">
          <SubSectionTitle itemType="tool" variant="filter">Innovation Stage</SubSectionTitle>
          <TagContainer variant="filter">
            {(tool.tags.innovation_stage || []).map((tag, index) => {
              const tagName = getTagName('innovation_stage', tag);
              return (
                <Tag key={index} itemType="tool" variant="filter" onClick={() => handleFilterClick(tag)}>
                  {tagName}
                </Tag>
              );
            })}
          </TagContainer>
        </SubSection>
        <SubSection variant="filter">
          <SubSectionTitle itemType="tool" variant="filter">Sectors</SubSectionTitle>
          <TagContainer variant="filter">
            {(tool.tags.sectors || []).map((tag, index) => {
              const tagName = getTagName('sectors', tag);
              return (
                <Tag key={index} itemType="tool" variant="filter" onClick={() => handleFilterClick(tag)}>
                  {tagName}
                </Tag>
              );
            })}
          </TagContainer>
        </SubSection>
        <SubSection variant="filter">
          <SubSectionTitle itemType="tool" variant="filter">Targeting</SubSectionTitle>
          <TagContainer variant="filter">
            {(tool.tags.targeting || []).map((tag, index) => {
              const tagName = getTagName('targeting', tag);
              return (
                <Tag key={index} itemType="tool" variant="filter" onClick={() => handleFilterClick(tag)}>
                  {tagName}
                </Tag>
              );
            })}
          </TagContainer>
        </SubSection>
        <SubSection variant="filter">
          <SubSectionTitle itemType="tool" variant="filter">Timeline</SubSectionTitle>
          <TagContainer variant="filter">
            {(tool.tags.timeline || []).map((tag, index) => {
              const tagName = getTagName('timeline', tag);
              return (
                <Tag key={index} itemType="tool" variant="filter" onClick={() => handleFilterClick(tag)}>
                  {tagName}
                </Tag>
              );
            })}
          </TagContainer>
        </SubSection>
      </Section>
    </div>
  );
}; 