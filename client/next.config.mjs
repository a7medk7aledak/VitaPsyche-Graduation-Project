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
      {
        protocol: "https",
        hostname: "abdokh.pythonanywhere.com", // Add this domain
        port: "",
        pathname: "/**", // Allows all images from this domain
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/tests/paid/:path*",
        destination: "/tests/paid/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
