/**
 * 生产环境
 */
; (function () {
  window.SITE_CONFIG = {};
  window.SITE_CONFIG["webTitle"] = "vue2.0 template prod";
  // api接口请求地址
  window.SITE_CONFIG["baseUrl"] = "https://api.coindesk.com";
  window.SITE_CONFIG["proxy"] = "https://api.coindesk.com";
  window.SITE_CONFIG['version'] = "$versionCode" // 版本号(年月日时分) 打包时会自动加上

  //生产环境可以通过 window.SITE_CONFIG['version']加载指定版本项目
  var script = document.createElement('script')
  script.src = window.SITE_CONFIG['version'] + "/sourceMap.js"
  document.getElementsByTagName('head')[0].appendChild(script)
})();
