import "dotenv/config";

export default {
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    domains: ["cdn.myanimelist.net"],
  },
};
