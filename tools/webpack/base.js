const path = require('path');
const webpack = require('webpack');
const globby = require('globby');

const conf = require('../config');

exports.entry = globby.sync([path.join(conf.path.scripts, '*.ts')])
  .reduce((tmp, filepath) => {
    tmp[path.basename(filepath, path.extname(filepath))] = filepath;
    return tmp;
  },
  {},
);

exports.output = {
  path: conf.path.dest.production,
  filename: 'js/[name].js',
  publicPath: '/',
};

exports.resolve = {
  modules: ['node_modules'],
  extensions: ['json', '.tsx', '.ts', '.css', '.js'],
};

exports.rules = [
  {
    test: /\.(txt|md|frag)$/,
    use: 'raw-loader',
  },
];

exports.plugins = [
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
  }),
];

exports.optimization = {
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor.bundle',
        chunks: 'initial',
      },
    }
  }
};
