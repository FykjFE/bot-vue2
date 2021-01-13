/**
 * @author 闰月飞鸟
 * @description 版本控制插件，
 *  */  
const fs = require('fs-extra')
module.exports = class VersionPlugin {
  constructor(option) {
    this.option = option;
  }
  apply(compiler) {
    let versionCode = this.option.versionCode || ''
    let _saveFile = this.saveFile
    compiler.hooks.entryOption.tap('VersionPlugin', (compilation) => {
      let ConfigFile = 'public/config/index.js'
      let PackConfigFile = `webpackConfig/config/index-${process.env.NODE_ENV}.js`
      fs.ensureFile(PackConfigFile).then(() => {
        var data = fs.readFileSync(PackConfigFile);
        data = data.toString().replace('$versionCode', versionCode)
        fs.ensureFile(ConfigFile).then(() => {
          fs.writeFileSync(ConfigFile, data);
        })
      })
    })
    //生产环境加载
    if (process.env.NODE_ENV == 'prod' || process.env.NODE_ENV == 'production')
      compiler.hooks.compilation.tap('VersionPlugin', (compilation) => {
        compilation.plugin(
          "html-webpack-plugin-before-html-processing",
          function (htmlPluginData, callback) {
            _saveFile(versionCode, htmlPluginData.assets)
          }
        );
        //需要升级vueCli 中字典的HtmlWebpackPlugin到最新 4.5.1+ 并在plugins中引入
        /* HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
          'VersionPlugins', // <-- Set a meaningful name here for stacktraces
          (htmlPluginData, cb) => {
            // Manipulate the content
            _saveFile(version, htmlPluginData.assets)
            cb(null, htmlPluginData)
          }
        ) */
      })
  }
  saveFile(versionCode, assets) {
    let path = `dist/${versionCode}/sourceMap.js`
    let loadSource = ` 
        var sourceMap= ${JSON.stringify(assets)};
        ; (function () {
            //CSS
            loadSouceCss(sourceMap)
            //JS
            loadSouceJs(sourceMap)
          })()
        function loadSouceCss(source) {
          document.getElementsByTagName('html')[0].style.opacity = 0
          var i = 0
          var _style = null
          var createStyles = function () {
            if (i >= source.css.length) {
              document.getElementsByTagName('html')[0].style.opacity = 1
              return
            }
            _style = document.createElement('link')
            _style.href = source.css[i]
            _style.setAttribute('rel', 'stylesheet')
            _style.onload = function () {
              i++
              createStyles()
            }
            document.getElementsByTagName('head')[0].appendChild(_style)
          }
          createStyles()
        }
        function loadSouceJs(source) {
          var i = 0
          var _script = null
          var createScripts = function () {
            if (i >= source.js.length) {
              return
            }
            _script = document.createElement('script')
            _script.src = source.js[i]
            _script.onload = function () {
              i++
              createScripts()
            }
            document.getElementsByTagName('body')[0].appendChild(_script)
          }
          createScripts()
        }`
    fs.ensureFile(path).then(() => {
      fs.writeFileSync(path, loadSource);
    })
  }
  static setVersion() {
    if (process.env.NODE_ENV == 'prod' || process.env.NODE_ENV == 'production') {
      var d = new Date();
      var yy = d.getFullYear().toString().slice(2);
      var MM = d.getMonth() + 1 >= 10 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
      var DD = d.getDate() >= 10 ? d.getDate() : '0' + d.getDate();
      var h = d.getHours() >= 10 ? d.getHours() : '0' + d.getHours();
      var mm = d.getMinutes() >= 10 ? d.getMinutes() : '0' + d.getMinutes();
      return yy + MM + DD + h + mm;
    } else return ''
  }
}