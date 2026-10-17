import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // ローカル開発環境のシンボリックリンク解決用（Vercel等の本番環境では自動解決）
  ...(process.env.NODE_ENV !== "production"
    ? {
        turbopack: {
          root: path.resolve(__dirname, ".."),
        },
      }
    : {}),
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
