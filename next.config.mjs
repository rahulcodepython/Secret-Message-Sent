/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGODB_URL: process.env.MONGODB_URL,
        DOMAIN_NAME: process.env.DOMAIN_NAME,
        ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    },
};

export default nextConfig;
