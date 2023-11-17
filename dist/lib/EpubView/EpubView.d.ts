import React, { Component } from 'react';
import { Book } from 'epubjs';
import type { NavItem, Contents, Rendition, Location } from 'epubjs';
import { type IEpubViewStyle } from './style';
import type { RenditionOptions } from 'epubjs/types/rendition';
import type { BookOptions } from 'epubjs/types/book';
export type RenditionOptionsFix = RenditionOptions & {
    allowPopups: boolean;
};
export type IToc = {
    label: string;
    href: string;
};
export type IEpubViewProps = {
    url: string | ArrayBuffer;
    epubInitOptions?: Partial<BookOptions>;
    epubOptions?: Partial<RenditionOptionsFix>;
    epubViewStyles?: IEpubViewStyle;
    loadingView?: React.ReactNode;
    location: string | number | null;
    locationChanged(value: string): void;
    showToc?: boolean;
    tocChanged?(value: NavItem[]): void;
    getRendition?(rendition: Rendition): void;
    handleKeyPress?(): void;
    handleTextSelected?(cfiRange: string, contents: Contents): void;
};
type IEpubViewState = {
    isLoaded: boolean;
    toc: NavItem[];
};
export declare class EpubView extends Component<IEpubViewProps, IEpubViewState> {
    state: Readonly<IEpubViewState>;
    viewerRef: React.RefObject<HTMLDivElement>;
    location?: string | number | null;
    book?: Book;
    rendition?: Rendition;
    prevPage?: () => void;
    nextPage?: () => void;
    constructor(props: IEpubViewProps);
    componentDidMount(): void;
    initBook(): void;
    componentWillUnmount(): void;
    shouldComponentUpdate(nextProps: IEpubViewProps): boolean;
    componentDidUpdate(prevProps: IEpubViewProps): void;
    initReader(): void;
    registerEvents(): void;
    onLocationChange: (loc: Location) => void;
    renderBook(): import("react/jsx-runtime").JSX.Element;
    handleKeyPress: (event: KeyboardEvent) => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
