import styled from '@emotion/styled';

export const ProgressContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
`;

export const FallbackContainer = styled.div`
  pointer-events: none;

  animation: fadeOut 0.2s ease forwards; // forwards는 애니메이션 끝난 후에도 마지막 스타일을 유지하라는 의미

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.3;
    }
  }
`;

export const ContentContainer = styled.div`
  animation: fadeIn 0.2s ease backwards;

  @keyframes fadeIn {
    from {
      opacity: 0.3;
    }
    to {
      opacity: 1;
    }
  }
`;
