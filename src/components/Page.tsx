import React from 'react';
import { TopBanner } from './TopBanner';
import { Header } from './Header';

export interface PageProps {
    title?: string;
    subtitle?: string;
    showBannerOnMobile?: boolean;
    children: React.ReactNode;
}

export const Page: React.FC<PageProps> = ({ title, subtitle, showBannerOnMobile = false, children }) => {
    return (
        <>
            <TopBanner showOnMobile={showBannerOnMobile} />
            {title && <Header title={title} subtitle={subtitle} />}
            {children}
        </>
    );
};