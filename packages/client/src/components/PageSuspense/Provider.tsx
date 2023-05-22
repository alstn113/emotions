import React, { createContext, SetStateAction, useRef, useState } from 'react';

interface FallbackContextType {
  fallbackRef: React.MutableRefObject<React.ReactNode>;
  setFallback: (children: React.ReactNode) => void;
}
export const SuspenseFallbackContext =
  createContext<FallbackContextType | null>(null);

const SuspenseFallbackProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const fallbackRef = useRef<React.ReactNode>(null);
  const setFallback = (children: React.ReactNode) => {
    fallbackRef.current = children;
  };

  return (
    <SuspenseFallbackContext.Provider value={{ fallbackRef, setFallback }}>
      {children}
    </SuspenseFallbackContext.Provider>
  );
};

type PageLoadedActionContextValue = React.Dispatch<SetStateAction<boolean>>;

export const SetPageLoadedContext =
  createContext<PageLoadedActionContextValue | null>(null);
export const IsPageLoadedContext = createContext<boolean>(false);

const PageLoadStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  return (
    <SetPageLoadedContext.Provider value={setIsPageLoaded}>
      <IsPageLoadedContext.Provider value={isPageLoaded}>
        {children}
      </IsPageLoadedContext.Provider>
    </SetPageLoadedContext.Provider>
  );
};

export default function PageSuspenseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SuspenseFallbackProvider>
      <PageLoadStateProvider>{children}</PageLoadStateProvider>
    </SuspenseFallbackProvider>
  );
}
