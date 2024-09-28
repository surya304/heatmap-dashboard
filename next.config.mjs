// next.config.mjs
export default {
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/login",
        permanent: false,
      },
    ];
  },
};