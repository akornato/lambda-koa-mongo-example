module.exports = {
  mode: 'development',
  devtool: 'source-map',
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  },
  module: {
    // turn off warning that mongoose requires dependency based on an expression
    // see https://github.com/webpack/webpack/issues/196
    exprContextCritical: false,
  },
};
