import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: [
      "github.com",
      "chat-kanban.s3.us-east-1.amazonaws.com",
      "google.com",
    ],
  },
};

export default nextConfig;
