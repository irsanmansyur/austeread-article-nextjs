/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_SITE_KEY: process.env.REACT_APP_SITE_KEY,
  },
  images: {
    domains: ["austeread.com", "article.austeread.com", "flowbite.com"],
  },
};

const intercept = require("intercept-stdout");

// safely ignore recoil warning messages in dev (triggered by HMR)
function interceptStdout(text) {
  if (text.includes("Duplicate atom key")) {
    return "";
  }
  return text;
}

if (process.env.NODE_ENV === "development") {
  intercept(interceptStdout);
}
module.exports = nextConfig;
