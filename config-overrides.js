const { override, fixBabelImports, addWebpackAlias, addLessLoader } = require('customize-cra');
const path = require('path');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    // 修改 less 变量(修改 antd 默认配色)
    modifyVars: {
      '@primary-color': '#f8d849'
    },
  }),
  addWebpackAlias({
    "src": path.resolve(__dirname, './src'),
    "components": path.resolve(__dirname, './src/components')
  })
)