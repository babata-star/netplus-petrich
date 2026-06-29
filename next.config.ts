import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * Security headers — прилагат се на всички responses.
 * Следват best practices за production web apps.
 */
const securityHeaders = [
  // HTTPS enforcement (1 година, include subdomains)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Предотвратява MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Clickjacking защита
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Referrer политика — изпращай origin само за cross-origin
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Permissions policy — забрани ненужни browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
      // Content Security Policy
      // - default-src 'self': само от собствения origin
      // - script-src: self + Next.js inline + unsafe-inline (Next изисква за RSC)
      // - style-src: self + inline styles (Tailwind + framer-motion)
      // - img-src: self + data: (SVG/placeholder) + https
      // - font-src: self (next/font self-hosts)
      // - connect-src: self (API + auth)
      // - frame-src: разрешава Google Maps embed в contacts
      // - frame-ancestors 'self': кликджакинг защита
      // - form-action 'self': форми само към нас
      // - upgrade-insecure-requests: автоматичен HTTPS
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: https:",
          "font-src 'self' data:",
          "connect-src 'self' https:",
          "media-src 'self'",
          "frame-src 'self' https://maps.google.com https://www.google.com",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "frame-ancestors 'self'",
          "upgrade-insecure-requests",
        ].join("; "),
      },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Премахва X-Powered-By header (не разкривай Next.js версия)
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
