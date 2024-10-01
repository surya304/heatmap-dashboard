// // next.config.mjs
// export default {
//   async redirects() {
//     return [
//       {
//         source: "/admin",
//         destination: "/login",
//         permanent: false,
//       },
//     ];
//   },
// };

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
}

export default nextConfig;