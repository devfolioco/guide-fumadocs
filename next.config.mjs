import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/docs/:path*.mdx",
        destination: "/llms.mdx/:path*",
      },
    ];
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/docs/guide/fun",
        permanent: false, // set to false if it's a temporary redirect
      },
    ];
  },
};

export default withMDX(config);
