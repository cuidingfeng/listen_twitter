// next.config.js

export default {
    // Your custom webpack configuration (if needed)
    webpack: (config, { isServer }) => {
        // Customize webpack config here
        if (isServer) {
            // Server-side configuration
        } else {
            // Client-side configuration
        }
        return config;
    },

    // Set environment variables
    env: {
        MY_VARIABLE: 'my-value',
    },

    // Set custom page extensions (default: ['.js', '.jsx', '.ts', '.tsx'])
    pageExtensions: ['jsx', 'js', 'ts', 'tsx'],

    // Specify custom routes
    async redirects() {
        return [
            {
                source: '/old-route',
                destination: '/new-route',
                permanent: true,
            },
        ];
    },

    // Add headers to responses
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Custom-Header',
                        value: 'Hello, Next.js!',
                    },
                ],
            },
        ];
    },

    // Enable or disable trailing slashes on URLs
    trailingSlash: true,

    // Other options...
};
