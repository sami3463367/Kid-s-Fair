/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // বিল্ড কখনো যেন লিন্ট এর কারণে ব্যর্থ না হয় (কোয়ালিটি চেক আলাদাভাবে `npm run lint`)
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
