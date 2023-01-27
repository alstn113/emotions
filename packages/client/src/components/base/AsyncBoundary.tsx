import React, { Suspense } from 'react';
import { Loader } from '~/components/common';
import ErrorBoundary from '~/components/base/ErrorBoundary';

interface Props {
  pendingFallback?: React.ReactNode;
  rejectedFallback: React.ReactNode;
  children: React.ReactNode;
}
const AsyncBoundary = ({
  pendingFallback = <Loader color="warning" size="lg" />,
  rejectedFallback,
  children,
}: Props) => {
  return (
    <ErrorBoundary fallback={rejectedFallback}>
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default AsyncBoundary;
