const plugins = require.context("", true, /^((?!index).)+\.js$/);
plugins.keys().forEach(plugin => {
  plugins(plugin);
});
