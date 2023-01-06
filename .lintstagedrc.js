module.exports = {
  // This will lint and format TypeScript and                                             //JavaScript files
  '**/*.(ts|tsx|js)': (filenames) => [
    `pnpm lint ${filenames.join(' ')}`,
    `pnpm format ${filenames.join(' ')}`,
  ],

  // this will Format MarkDown and JSON
  '**/*.(md|json)': (filenames) => `pnpm format ${filenames.join(' ')}`,
};
