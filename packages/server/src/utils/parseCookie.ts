export const parseCookie = (
  cookie: string,
  key: string,
): string | undefined => {
  const value = cookie
    ?.split('; ')
    .find((cookie: string) => cookie.startsWith(key))
    .split('=')[1];

  return value;
};
