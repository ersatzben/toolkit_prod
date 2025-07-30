import React from 'react';
import styled from 'styled-components';
import { TopBanner } from './TopBanner';
import { Header } from './Header';
import { Footer } from './Footer';

export interface PageProps {
    title?: string;
    subtitle?: string;
    showBannerOnMobile?: boolean;
    onFrameworkSectionClick?: (section: string) => void;
    children: React.ReactNode;
}

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const MainContent = styled.main`
    flex: 1;
`;

export const Page: React.FC<PageProps> = ({ title, subtitle, showBannerOnMobile = false, onFrameworkSectionClick, children }) => {
    return (
        <PageWrapper>
            <TopBanner showOnMobile={showBannerOnMobile} />
            {title && <Header title={title} subtitle={subtitle} onFrameworkSectionClick={onFrameworkSectionClick} />}
            <MainContent>
                {children}
            </MainContent>
            <Footer />
        </PageWrapper>
    );
};