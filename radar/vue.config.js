const webpack=require('webpack')
module.exports = {
    // publicPath:'/',    // 公共路径
    // outputDir: process.env.NODE_ENV === "development" ? 'devdist' : 'dist', // 不同的环境打不同包名
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api':{
                target:'127.0.0.1:8080',
                // target:'192.168.152.254:8080',
                // target:'/',
                changeOrigin:true,
                pathRewrite:{
                    '^/api':''
                }
            }
        },
    },
    configureWebpack: {
           plugins: [       
              new webpack.ProvidePlugin({       
                $:"jquery",       
                jQuery:"jquery",       
                jquery:"jquery",       
                "windows.jQuery":"jquery"      
              })        
            ]        
        }
}