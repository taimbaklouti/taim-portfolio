import * as react_jsx_runtime from "react/jsx-runtime";
import React from "react";

interface SectionInfo {
  index: number;
  anchor: string | null;
  element: HTMLElement | null;
}
interface FullPageOptions {
  scrollingSpeed?: number;
  anchors?: string[];
  menu?: string;
  lockAnchors?: boolean;
  onSectionChange?: (prevIndex: number, nextIndex: number) => void;
  beforeScroll?: (origin: SectionInfo, destination: SectionInfo) => void;
  afterScroll?: (origin: SectionInfo, destination: SectionInfo) => void;
  keyboardScrolling?: boolean;
  touchScrolling?: boolean;
  wheelScrolling?: boolean;
  scrollThreshold?: number;
  touchThreshold?: number;
}
interface FullPageContextValue {
  activeIndex: number;
  isScrolling: boolean;
  scrollDirection: "up" | "down" | null;
  totalSections: number;
  anchors: string[];
  moveTo: (target: number | string, duration?: number) => void;
  moveNext: () => void;
  movePrevious: () => void;
  getActiveSection: () => SectionInfo;
  setAllowScrolling: (allow: boolean) => void;
  registerSection: (element: HTMLElement) => () => void;
}

interface FullPageProviderProps extends FullPageOptions {
  children: React.ReactNode;
}
declare function FullPageProvider({
  children,
  scrollingSpeed,
  anchors,
  menu,
  lockAnchors,
  onSectionChange,
  beforeScroll,
  afterScroll,
  keyboardScrolling,
  touchScrolling,
  wheelScrolling,
  scrollThreshold,
  touchThreshold,
}: FullPageProviderProps): react_jsx_runtime.JSX.Element;

interface FullPageWrapperProps {
  children: React.ReactNode;
  className?: string;
}
declare function FullPageWrapper({
  children,
  className,
}: FullPageWrapperProps): react_jsx_runtime.JSX.Element;

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}
declare function Section({ children, className }: SectionProps): react_jsx_runtime.JSX.Element;

declare function useFullPage(): FullPageContextValue;

export {
  type FullPageContextValue,
  type FullPageOptions,
  FullPageProvider,
  FullPageWrapper,
  Section,
  type SectionInfo,
  useFullPage,
};
