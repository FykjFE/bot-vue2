module.exports = {
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      "/api": {
        target: "https://api.coindesk.com",
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
      }
    }
  },
  transpileDependencies: ["vuex-persist"]
};
