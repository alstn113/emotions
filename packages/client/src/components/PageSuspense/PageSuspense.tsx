import React, { useContext, useEffect, Suspense } from 'react';

import PageProgress from './PageProgress';
import PageSuspenseProvider, {
  SetPageLoadedContext,
  SuspenseFallbackContext,
} from './Provider';
import { ContentContainer, FallbackContainer } from './PageSuspense.styles';

interface ProviderProps {
  children: React.ReactNode;
}

const SuspenseContainer = ({ children }: ProviderProps) => {
  const setPageLoaded = useContext(SetPageLoadedContext);
  const fallbackContext = useContext(SuspenseFallbackContext);

  if (!fallbackContext) {
    throw new Error(
      'SuspenseFallbackProvider가 호출되지 않았거나, 상태 업데이트에 문제가 있습니다.',
    );
  }

  const { fallbackRef } = fallbackContext;

  const FallbackComponent = () => {
    useEffect(() => {
      setPageLoaded && setPageLoaded(false);
    }, []);
    return <FallbackContainer>{fallbackRef.current}</FallbackContainer>;
  };

  return (
    <>
      <PageProgress />
      <Suspense fallback={<FallbackComponent />}>{children}</Suspense>
    </>
  );
};

const PageChildrenWrapper = (children: JSX.Element) => {
  const context = useContext(SuspenseFallbackContext);
  const setIsPageLoaded = useContext(SetPageLoadedContext);

  if (!context) {
    throw new Error(
      'SuspenseFallbackProvider가 호출되지 않았거나, 상태 업데이트에 문제가 있습니다.',
    );
  }

  useEffect(() => {
    context.setFallback(children);
    setIsPageLoaded && setIsPageLoaded(true);

    return () => context.setFallback(null);
  }, [children]);

  return <ContentContainer>{children}</ContentContainer>;
};

const PageSuspense = Object.assign(SuspenseContainer, {
  Provider: PageSuspenseProvider,
  subscribe: PageChildrenWrapper,
});

export default PageSuspense;
