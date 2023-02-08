// react
import React, { Suspense } from 'react';

// components
import styled from '@emotion/styled';
import { Loader } from '~/components/common';
import ErrorBoundary from '~/components/base/ErrorBoundary';

interface Props {
  pendingFallback?: React.ReactNode;
  rejectedFallback: React.ReactNode;
  children: React.ReactNode;
}
const AsyncBoundary = ({
  pendingFallback = (
    <Container>
      <Loader color="warning" size="lg" />
    </Container>
  ),
  rejectedFallback,
  children,
}: Props) => {
  return (
    <ErrorBoundary fallback={rejectedFallback}>
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export default AsyncBoundary;
