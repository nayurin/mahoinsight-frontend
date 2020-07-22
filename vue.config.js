const webpack = require("webpack")
const { InjectManifest } = require("workbox-webpack-plugin")

let commit

try {
  commit = require('child_process').execSync('git rev-parse --short HEAD').toString() || "unknown"
} catch (e) {
  commit = "unknown"
}

module.exports = {
  productionSourceMap: false,
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: config => {
    config
      .plugin('define')
      .tap(args => {
        args[0].GIT_COMMIT = JSON.stringify(commit)
        return args
      })
    config
      .plugin('workbox')
        .use(InjectManifest, [{ swSrc: './src/workers/sw.js', dontCacheBustURLsMatching: /.[a-f0-9]{8}./, maximumFileSizeToCacheInBytes: 8 * 1024 * 1024 }])
  }
}
