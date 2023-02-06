export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 8080,
  BASE_URL: process.env.BASE_URL || 'http://localhost:8080',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  ALLOWLIST: ['http://localhost:3000', 'https://wap-dev.store'],

  // aws-s3
  S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
  S3_SECRET_KEY: process.env.S3_SECRET_KEY,
  S3_REGION: process.env.S3_REGION,
  S3_BUCKET: process.env.S3_BUCKET,
});
