module.exports = {
  images: {
    domains: ["gravatar.com"],
  },
  eslint: {
    // dirs: ['components', 'layouts', 'lib', 'pages']
  },
  async headers() {
    return [
      {
        source: "/:path*{/}?",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; script-src 'self' https://analytics.rafaelschranz.com; connect-src 'self' https://analytics.rafaelschranz.com; img-src 'self'; style-src 'self';`,
          },
          {
            key: "Permissions-Policy",
            value: "interest-cohort=()",
          },
        ],
      },
    ];
  },
  transpilePackages: ["dayjs"],
  env: {
    NODE_ENV: process.env.NODE_ENV, // Ensure NODE_ENV is available
  },
  // Uncomment below section if using Preact (optional)
  // webpack: (config, { dev, isServer }) => {
  //   // Replace React with Preact only in client production build
  //   if (!dev && !isServer) {
  //     Object.assign(config.resolve.alias, {
  //       react: 'preact/compat',
  //       'react-dom/test-utils': 'preact/test-utils',
  //       'react-dom': 'preact/compat'
  //     })
  //   }
  //   return config
  // }
};
