import styled from '@emotion/styled';
import React from 'react';
import { LoadingSpinner } from '../common';

const Loading = () => {
  return (
    <Container>
      <LoadingSpinner />
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Loading;
