import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled.div<{
  progressStatus: 'playing' | 'completed' | 'pending' | 'unset';
  progressPercent: number;
  progressDuration: `${number}s` | '';
}>`
  width: 100%;
  height: 4px;
  position: relative;
  border-radius: 0.1875rem;
  background-color: #e6e6e6;

  .percent {
    width: 0%;
    height: 100%;
    transition: width 0.5s ease;
    border-radius: 0.1875rem;
    // 주황색
    background-color: #f76707;
    animation-duration: ${({ progressDuration }) => progressDuration};
    width: ${({ progressPercent }) => `${progressPercent}%`};
  }

  ${({ progressStatus }) =>
    progressStatus === 'playing' &&
    css`
      .percent {
        animation-name: setAnimationContent;
        animation-play-state: running;
        animation-fill-mode: forwards;
        animation-timing-function: linear;
      }

      @keyframes setAnimationContent {
        from {
          width: 0%;
        }
        to {
          width: 100%;
        }
      }
    `}

  ${({ progressStatus }) =>
    progressStatus === 'completed' &&
    css`
      animation: ${fadeOut} 0.2s linear forwards 0.5s;

      .percent {
        animation: ${fillWidth} 0.2s ease-in forwards;
      }
    `}
`;

const fillWidth = keyframes`
  from {
    width: 0%;
  }
  
  to {
    width: 100%;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  
  to {
    opacity: 0;
  }
`;
