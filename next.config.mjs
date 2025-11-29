/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            "tap": false,
            "why-is-node-running": false,
        };
        return config;
    },
    experimental: {
        serverExternalPackages: ["pino"],
    },
};

export default nextConfig;
