/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "diseases-content.s3.eu-west-1.amazonaws.com",
        port: "",
        pathname: "/**", // Allows all images from this domain
      },
    ],
  },
};



export default nextConfig;
