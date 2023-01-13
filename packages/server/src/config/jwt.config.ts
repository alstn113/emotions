export default () => ({
  access_token: {
    secret: process.env.ACCESS_TOKEN_SECRET,
    duration: process.env.ACCESS_TOKEN_DURATION || '1h',
  },
});
