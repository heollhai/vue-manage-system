const path = require("path"); //用于路径别名使用，，，这个需要下载  npm  install  path  --save
function resolve(dir) {
  return path.join(__dirname, dir); //不确定干嘛用   引入路径需要使用这个方法
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("src"));
  },
  devServer: {
    port: 8080,
    open: true
  },
  css: {
    loaderOptions: {
      sass: {
        // 1: data: `@import "./src/styles/main.scss";`
        // 2: prependData: `@import "./src/styles/main.scss";`
        // 3: additionalData: `@import "./src/styles/main.scss";`
        //三种那种可以选哪种
        additionalData: `@import "@/assets/scss/_varlable.scss";`
      }
    }
  }
};
