const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

// dev服务端口
const devServerPort = 4396;
module.exports = {
  devServer: {
    port: devServerPort, // 端口
    open: true, // 启动时自动打开
    progress: true, // 展示进度条
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "src/style/_variables.scss")],
    },
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
};
