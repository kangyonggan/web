module.exports = {
    devServer: {
        disableHostCheck: true,
        port: 8085,
        public: '0.0.0.0:8085',
        proxy: {
            '/api': {
                target: 'https://kangyonggan.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ""
                }
            }
        }
    }
}

