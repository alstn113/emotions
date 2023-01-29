import * as React from 'react';
import { SVGProps } from 'react';
const SvgMenuDots = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <g data-name="01 align center" fill="currentColor">
      <circle cx={12} cy={2} r={2} />
      <circle cx={12} cy={12} r={2} />
      <circle cx={12} cy={22} r={2} />
    </g>
  </svg>
);
export default SvgMenuDots;
