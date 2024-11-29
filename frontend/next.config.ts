import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
};

module.exports = {
  images: {
    domains: ["github.com", "chat-kanban.s3.us-east-1.amazonaws.com"],
  },
};

export default nextConfig;
