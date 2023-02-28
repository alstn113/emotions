/**
 * Sleep for a given number of milliseconds.
 * @param ms The number of milliseconds to sleep.
 * @returns A promise that resolves after the given number of milliseconds.
 * @example
 * ```ts
 * await sleep(1000);
 * ```
 */
const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default sleep;
