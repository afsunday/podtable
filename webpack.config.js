const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    // experiments: {
    //     outputModule: true
    // },
    // output: {
    //     path: path.resolve(__dirname, './dist'),
    //     filename: 'podtable.js',
    //     module: true,
    //     libraryTarget: 'module',
    //     globalObject: 'this'
    // },
    output: {
      path: path.resolve(__dirname, './dist/umd'),
      filename: 'podtable.js',
      library: 'Podtable',
      libraryTarget: 'umd',
      globalObject: 'this',
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      }],
    },
  };