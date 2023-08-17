import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled.div<{
  status: 'play' | 'done' | 'pending' | 'unset';
}>`
  width: 100%;
  height: 4px;
  position: relative;
  border-radius: 0.1875rem;
  background-color: #d5dedf;

  ${({ status }) => {
    if (status === 'play') {
      return css`
        div {
          animation-play-state: running;
          animation-fill-mode: forwards;
          animation-timing-function: linear;

          animation: ${play};
        }
      `;
    } else if (status === 'done') {
      return css`
        animation: ${done} 0.2s linear forwards 0.5s;

        div {
          animation: ${play} 0.2s ease-in forwards;
        }
      `;
    }
  }}
`;

const play = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`;

const done = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const Percent = styled.div`
  width: 0%;
  height: 100%;
  transition: width 0.5s ease;
  border-radius: 0.1875rem;
  background-color: #317172;
`;
