import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import type { TermsList } from '../../types/Tool';

// Modal component for term definitions
const TermModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    termName: string;
    termDescription: string;
}> = ({ isOpen, onClose, termName, termDescription }) => {
    useEffect(() => {
        if (isOpen) {
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        } else {
            // Restore body scroll when modal is closed
            document.body.style.overflow = 'unset';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 10000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                overflowY: 'auto' // Allow scrolling within the modal overlay if needed
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: '20px',
                    maxWidth: '90vw',
                    maxHeight: '80vh',
                    opacity: '1 !important',
                    overflow: 'auto',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                    position: 'relative' // Ensure proper positioning
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>{termName}</h3>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '24px',
                            cursor: 'pointer',
                            padding: '0',
                            color: '#666'
                        }}
                    >
                        ×
                    </button>
                </div>
                <p style={{ margin: 0, lineHeight: '1.5', color: '#333' }}>{termDescription}</p>
            </div>
        </div>
    );
};

// Term component for proper tooltip handling
const TermComponent: React.FC<{ name: string; description: string }> = ({ name, description }) => {
    const [showModal, setShowModal] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowModal(true); // Always open modal on click
    };

    return (
        <>
            <a
                href="#"
                className="term-tooltip"
                style={{
                    textDecoration: 'underline',
                    textDecorationStyle: 'dotted',
                    cursor: 'pointer',
                    position: 'relative',
                    color: 'inherit'
                }}
                data-tooltip={description}
                onClick={handleClick}
            >
                {name}
            </a>

            <TermModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                termName={name}
                termDescription={description}
            />
        </>
    );
};

export const MarkdownWithTerms: React.FC<{ markdown: string, termsList: TermsList }> = ({ markdown, termsList }) => {

    const termRegex = /\[term:([^\]]+)\]/g;

    let processedMarkdown = markdown.replace(termRegex, (match, termName) => {
        const term = termsList.find(t => t.name.toLowerCase() === termName.toLowerCase());
        if (term) {
            return `[${term.name}](#term-${encodeURIComponent(term.name)})`;
        }
        return match;
    });

    const lineRegex = /\n\n/g;
    processedMarkdown = processedMarkdown.replace(lineRegex, '<br /><br/>');


    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
            .term-tooltip {
              position: relative;
            }
            
            /* Desktop tooltips only */
            @media (min-width: 769px) and (hover: hover) {
              .term-tooltip::after {
                content: attr(data-tooltip);
                position: absolute;
                bottom: 100%;
                left: clamp(calc(200px - 50vw), 50%, calc(50vw - 200px));
                transform: translateX(-50%);
                background-color: #333;
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 12px;
                min-width: 200px;
                max-width: min(400px, 90vw);
                width: max-content;
                white-space: normal;
                word-wrap: break-word;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s, visibility 0.3s;
                z-index: 1000;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                margin-bottom: 5px;
              }
              
              .term-tooltip::before {
                content: '';
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%) translateY(100%);
                border: 5px solid transparent;
                border-top-color: #333;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s, visibility 0.3s;
                z-index: 1000;
              }
              
              .term-tooltip:hover::after,
              .term-tooltip:hover::before {
                opacity: 1;
                visibility: visible;
              }
            }
          `
            }} />
        <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
                a: ({ href, children, ...props }) => {
                    if (href && href.startsWith('#term-')) {
                        const termName = decodeURIComponent(href.substring(6));
                        const term = termsList.find(t => t.name.toLowerCase() === termName.toLowerCase());
                        if (term) {
                            return <TermComponent name={term.name} description={term.description} />;
                        }
                    }
                    return <a href={href} {...props}>{children}</a>;
                }
            }}
        >
            {processedMarkdown}
        </ReactMarkdown>
    </>
    );
};
