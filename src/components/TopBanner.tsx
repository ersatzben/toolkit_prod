
import React from 'react';
import { TopBannerContainer, TopBannerText } from '../styles/StyledComponents';

export const TopBanner: React.FC = () => {
  return (
    <TopBannerContainer>
      <TopBannerText>
        <strong>This is an experimental beta version.</strong> 
        We welcome feedback at <a href="mailto:contact@britishprogress.org">contact@britishprogress.org</a>
      </TopBannerText>
      <TopBannerText>
        Content by Helen Ewles, Sanjush Dalmia, Pedro Serôdio and Ben Johnson for <a href="https://britishprogress.org" target="_blank" rel="noopener noreferrer">Centre for British Progress</a>
      </TopBannerText>
    </TopBannerContainer>
  );
}; 