export default () => ({
  PORT: parseInt(process.env.SERVER_PORT, 10) || 8080,
  BASE_URL: process.env.BASE_URL || 'http://localhost:8080',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  CORS_ALLOWLIST: ['http://localhost:3000'],
});
