module.exports = {
    productionSourceMap: false,
    configureWebpack: () => {
        if (process.env.NODE_ENV !== 'production') {
            return {
                resolve: {
                    alias: {
                        vue$: 'vue/dist/vue.js'
                    }
                }
            };
        }
    },
    devServer: {
        port: 8088,
        proxy: {
            '/bzone': {
                target: 'https://prod-bqmex-bq-front-app.bqmex.com/v1',
                changeOrigin: true,
                pathRewrite: {
                    '^/bzone': '/'
                }
            }
        }
    }
};