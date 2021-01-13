const path = require('path')
const VersionPlugin = require('./webpackConfig/VersionPlugin.js')
var versionCode = VersionPlugin.setVersion(); // 版本号
const resolve = dir => {
	return path.join(__dirname, dir)
}
// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'./${request.contextPath}
const BASE_URL = process.env.NODE_ENV === 'prod' ? '/' : '/'

module.exports = {
	// Project deployment base
	// By default we assume your app will be deployed at the root of a domain,
	// e.g. https://www.my-app.com/
	// If your app is deployed at a sub-path, you will need to specify that
	// sub-path here. For example, if your app is deployed at
	// https://www.foobar.com/my-app/
	// then change this to '/my-app/'
	publicPath: BASE_URL,
	outputDir: "dist", // 输出文件目录
	lintOnSave: false, // eslint 是否在保存时检查
	assetsDir: versionCode, // 配置js、css静态资源二级目录的位置  
	// tweak internal webpack configuration.
	// see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
	// 如果你不需要使用eslint，把lintOnSave设为false即可
	lintOnSave: false,
	chainWebpack: config => {
		config.resolve.alias.set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
			.set('_c', resolve('src/components'))

		config.plugin("html").tap(args => {
			args[0].minify = false;
			args[0].inject = process.env.NODE_ENV == 'prod' || process.env.NODE_ENV == 'production' ? false : true;
			return args;
		});
		/* 	config.plugin('extract-css').tap(options => {
				options[0].filename = version+'/css/[name].css'
				return options
		  }) */
		config.optimization.splitChunks({
			chunks: 'all',
			cacheGroups: {
				libs: {
					name: 'chunk-libs',
					test: /[\\/]node_modules[\\/]/,
					priority: 10,
					chunks: 'initial' // only package third parties that are initially dependent
				},
				elementUI: {
					name: 'chunk-elementUI', // split elementUI into a single package
					priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
					test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
				},
				commons: {
					name: 'chunk-commons',
					test: resolve('src/components'), // can customize your rules
					minChunks: 3, //  minimum common number
					priority: 5,
					reuseExistingChunk: true
				}
			}
		})

	},
	configureWebpack: config => {
		config.resolve = {
			extensions: ['.js', '.vue', '.json', ".css"],
			alias: {
				'vue$': 'vue/dist/vue.esm.js',
				'@': resolve('src')
			}
		}
		config.plugins.push(new VersionPlugin({ versionCode }))
	},
	// 设为false打包时不生成.map文件
	productionSourceMap: false,
	css: {
		// 是否使用css分离插件 ExtractTextPlugin
		extract: true,
		// 开启 CSS source maps?
		sourceMap: true,
		// css预设器配置项
		loaderOptions: {

		},
	},
	// 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
	//设置跨域代理
	devServer: {
		//如果为 true ，页面出错不会弹出 404 页面
		historyApiFallback: true,
		/**热模块更新作用。即修改或模块后，保存会自动更新，页面不用刷新呈现最新的效果。
		这不是和 webpack.HotModuleReplacementPlugin （HMR） 这个插件不是一样功能吗？是的，
		不过请注意了，HMR 这个插件是真正实现热模块更新的。
		而 devServer 里配置了 hot: true ,
		webpack会自动添加 HMR 插件。所以模块热更新最终还是 HMR 这个插件起的作用*/
		hot: true,
		inline: true,
		//如果为 true ，开启虚拟服务器时，为你的代码进行压缩。加快开发流程和优化的作用。
		//		compress: true,
		stats: {
			colors: true
		},
		proxy: {
			'/apis': {
				target: 'https://api.coindesk.com', // 接口域名
				changeOrigin: true, //是否跨域
				secure: true, // 设置支持https协议的代理
				pathRewrite: {
					'^/apis': '' //需要rewrite重写的,
				}
			}
		},
		//写主机名的。默认 localhost
		host: 'localhost',
		//端口号。默认 8080
		port: 8090,
		/**如果为 true ，在浏览器上全屏显示编译的errors或warnings。默认 false （关闭）
		如果你只想看 error ，不想看 warning。*/
		//		errorOverlay: true
	}
}
