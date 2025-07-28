import React from 'react';
import { TopBanner } from './TopBanner';
import { Header } from './Header';

export interface PageProps {
    title?: string;
    children: React.ReactNode;
}

export const Page: React.FC<PageProps> = ({ title, children }) => {
    return (
        <>
            <TopBanner />
            {title && <Header title={title} />}
            {children}
        </>
    );
};