export default () => ({
  ACCESS_TOKEN: {
    SECRET: process.env.ACCESS_TOKEN_SECRET || 'secret',
    DURATION: process.env.ACCESS_TOKEN_DURATION || '1d',
  },
});
