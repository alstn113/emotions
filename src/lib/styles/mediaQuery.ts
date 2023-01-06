export const customMediaQuery = (maxWidth: number) => `
  @media (max-width: ${maxWidth}px)
`;

export const mediaQuery = {
  custom: customMediaQuery,
  xs: customMediaQuery(375),
  sm: customMediaQuery(768),
  md: customMediaQuery(1024),
  lg: customMediaQuery(1440),
  xl: customMediaQuery(1920),
} as const;

export default mediaQuery;
