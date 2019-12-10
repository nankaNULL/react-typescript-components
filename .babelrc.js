module.exports = {
  "presets": [
    ["@babel/preset-env", {
      "modules": false
    }],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "plugins": [
    ["import", { "libraryName": "antd", "style": true }, "antd"],
    ["import", {
      "libraryName": "yuwan",
      "style": true,
      "customName": (name) => {
        let curName = name.split('-')[1];
        return `yuwan/lib/${curName}` // 核心配置 根据你自己的组件目录配置
      },
    }, "yuwan"],
    ["@babel/plugin-transform-runtime", { "corejs": 2 }],
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }]
  ]
}