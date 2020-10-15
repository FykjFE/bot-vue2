const {
	series,
	src,
	dest,
	watch
} = require("gulp");
let $ = require("gulp-load-plugins")();
/**
 * @description 将service目录modules目录中的所有js文件注册到service 目录下的index文件中，
 */
function importService() {
	let target = src("src/services/template.index.js").pipe($.rename("index.js"));
	return src(["src/services/modules/*.js"])
		.on("data", function(file) {
			var fileName = file.relative.toString("utf-8").replace(".js", "");
			let str = `
				import * as ${fileName} from './modules/${file.relative}'
				service.${fileName}=${fileName}
				`;
			file.contents = Buffer.from(str);
			return file;
		})
		.pipe($.concat("index.js"))
		.on("end", function(e) {
			if (!e) {
				//src/services/modules中不存在js文件时 将模板中的占位字符清除
				target
					.pipe($.replace(/\"service-inject\"/g, ""))
					.pipe(dest("src/services/"));
			}
		})
		.on("data", function(file) {
			let buffer = file.contents.toString("utf-8");
			let str = buffer.toString("utf-8").trim();
			target
				.pipe($.replace(/\"service-inject\"/g, str))
				.pipe(dest("src/services/"));
		});
}
//修改src/config中的配置自动同步到public中
function setGlobalConfig() {
	let target = src(`src/config/index-${process.env.NODE_ENV}.js`).pipe($.rename("index.js"));
	return target
		.pipe(dest("public/config"));
}

function watchProcess(cb) {
	// 开发模式下开启监听
	if (process.env.NODE_ENV === 'dev') {
		watch(
			["src/services/modules/*.js", "src/services/template.index.js"], {
				delay: 500,
				events: ["add", "unlink", "unlinkDir", "ready"]
			},
			importService
		);
		watch(
			["src/config/index-*.js"], {
				delay: 500,
				events: ['all', 'ready']
			},
			setGlobalConfig
		);

	} else {
		importService()
		setGlobalConfig()
	}
	cb();
}

exports.default = series(watchProcess);
