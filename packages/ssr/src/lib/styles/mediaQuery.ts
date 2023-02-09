const customMediaQuery = (minWidth: number) => `
  @media (min-width: ${minWidth}px)
`;

export const mediaQuery = {
  custom: customMediaQuery,
  mobile: customMediaQuery(500),
  tablet: customMediaQuery(768),
  desktop: customMediaQuery(1200),
} as const;
