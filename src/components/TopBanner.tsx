
import React from 'react';
import { TopBannerContainer, TopBannerText } from '../styles/StyledComponents';

interface TopBannerProps {
  showOnMobile?: boolean;
}

export const TopBanner: React.FC<TopBannerProps> = ({ showOnMobile = false }) => {
  return (
    <TopBannerContainer className={showOnMobile ? 'show-on-mobile' : 'hide-on-mobile'}>
      <TopBannerText>
        <strong>This is an experimental beta version.</strong> 
        We welcome feedback at <a href="mailto:contact@britishprogress.org">contact@britishprogress.org</a>
      </TopBannerText>
    </TopBannerContainer>
  );
}; 