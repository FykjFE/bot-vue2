const {
	series,
	src,
	dest,
	watch
} = require("gulp");
let $ = require("gulp-load-plugins")();

const isDev = process.env.NODE_ENV == 'dev' || process.env.NODE_ENV == 'development'

/**
 * @description 将service目录modules目录中的所有js文件注册到service 目录下的index文件中，开发模式下使用import导入，生产模式下用webpack批导入
 * 
 */
function importService() {
	return src(["src/services/modules/*.js"])
		.on("data", function (file) {
			var fileName = file.relative.toString("utf-8").replace(".js", "");
			let str = `
				import * as ${fileName} from './modules/${file.relative}'
				service.${fileName}=${fileName}
				`;
			file.contents = Buffer.from(str);
			return file;
		})
		.pipe($.concat("index.js"))
		.on("data", function (file) {
			let buffer = file.contents.toString("utf-8");
			let str = buffer.toString("utf-8").trim();
			let source = '11'
			if (!isDev) {
				source = `
				import Vue from "vue";
				//自动扫描引入方式，配置方便
				const files = require.context('./modules', true, /\.js/)
				const modules = files.keys().reduce((obj, item) => {
					obj[item.match(/[^\./]+(?=\.js)/g)[0]] = files(item)
					return obj
				}, {})
				Vue.prototype.$service = modules
				export default modules;`
			}
			else {
				source = `
				import Vue from "vue";
				const service = {};
				/* 直接impot 然后手动赋值后，开发过程中通过模糊匹配提示输入来的方便,这里用gulp自动依据modules构建*/
				${str}
				Vue.prototype.$service = service;
				export default service;
				`
			}
			file.contents = Buffer.from(source)
			return file
		}).pipe(dest("src/services"));
}
function watchProcess(cb) {
	// 开发模式下开启监听
	if (isDev) {
		watch(
			["src/services/modules/*.js"], {
			delay: 500,
			events: ["add", "unlink", "unlinkDir", "ready"]
		},
			importService
		);

	} else {
		importService()
	}
	cb();
}

exports.default = series(watchProcess);
