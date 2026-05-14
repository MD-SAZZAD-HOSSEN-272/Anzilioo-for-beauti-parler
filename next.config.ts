import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname)
  },
  images: {
    remotePatterns: [
      // Bunny.net (BunnyCDN + Bunny Storage) - customize per your hostname later
      { protocol: "https", hostname: "**.b-cdn.net" },
      { protocol: "https", hostname: "storage.bunnycdn.com" },
      { protocol: "https", hostname: "www.simpleskincare.in" },
      { protocol: "https", hostname: "i.pinimg.com" },
      { protocol: "https", hostname: "example.com" }
    ]
  }
};

export default nextConfig;

