const withPlugins = require("next-compose-plugins");
const { withPlausibleProxy } = require("next-plausible");
const withBundleAnalyzer = require("@next/bundle-analyzer");
const nextTranslate = require("next-translate");

const plausiblePlugin = withPlausibleProxy;
const bundleAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
    openAnalyzer: true,

});

const nextConfig = {
    productionBrowserSourceMaps: process.env.ANALYZE === "true",
    reactStrictMode: true,
    images: {
        formats: ["image/avif", "image/webp"],
        domains: ["***"],
    },
    experimental: {
        optimizePackageImports: ["tailwindcss-animate", "framer-motion"],
    },
};

module.exports = withPlugins(
    [plausiblePlugin, bundleAnalyzer, nextTranslate],
    nextConfig
);

