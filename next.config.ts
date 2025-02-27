/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['nikhil-certificate.s3.us-east-1.amazonaws.com'], // Add your S3 bucket domain
  },
};

module.exports = nextConfig;