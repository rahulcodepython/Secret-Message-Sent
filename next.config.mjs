/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGODB_URL: process.env.MONGODB_URL,
        DOMAIN_NAME: process.env.DOMAIN_NAME,
    },
};

export default nextConfig;
