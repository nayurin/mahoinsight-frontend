const webpack = require("webpack")

let commit

try {
  commit = require('child_process').execSync('git rev-parse --short HEAD').toString() || "unknown"
} catch (e) {
  commit = "unknown"
}

module.exports = {
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
  }
}
