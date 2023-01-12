export default () => ({
  port: parseInt(process.env.SERVER_PORT, 10) || 8080,
  server: process.env.SERVER || 'http://localhost:8080',
  client: process.env.CLIENT || 'http://localhost:3000',
});
