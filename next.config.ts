/** @format */

// next.config.mjs
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  "./src/shared/i18n/request.ts",
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Дополнительные настройки Next.js, если нужны
};

export default withNextIntl(nextConfig);
