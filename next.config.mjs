/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output mode commented out - we need server-side rendering for MongoDB
  // output: 'export',

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },
}

export default nextConfig
