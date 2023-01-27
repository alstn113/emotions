import React, { Suspense } from 'react';
import { Loader } from '~/components/common';
import ErrorBoundary from '~/components/base/ErrorBoundary';
import styled from '@emotion/styled';

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
