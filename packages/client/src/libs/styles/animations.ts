import { keyframes } from '@emotion/react';

const appear = keyframes`
  0% {
    opacity: 0;
    transform: translateY(400px) scale(0.75);
  }
  75% {
    opacity: 1;
    transform: translateY(-16px) scale(1);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const disappear = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(400px) scale(0.75);
  }
`;

const animations = {
  appear,
  disappear,
};

export default animations;
