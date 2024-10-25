const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  resolveApp,
  resolveAppSrc,
  cssLoaderConfig,
  lessLoaderConfig,
  resolve,
} = require('./utils');

module.exports = {
  entry: {
    main: resolveAppSrc('index'),
  },
  output: {
    filename: '[name].[contenthash].js',
    path: resolveAppSrc('dist'),
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          // {
          //   loader: 'prettier-loader',
          //   options: {
          //     parser: 'babel',
          //   },
          // },
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                // https://github.com/umijs/babel-plugin-import
              ],
              plugins: [['import', { libraryName: 'antd', style: true }, 'antd']], // antd按需加载
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', cssLoaderConfig],
      },
      {
        test: /\.less$/i,
        use: ['style-loader', cssLoaderConfig, lessLoaderConfig],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '测试系统',
      template: resolveApp('test/public/index.html'),
      favicon: resolveApp('test/public/favicon.ico'),
    }),
    // new webpack.DefinePlugin({}),
  ],
  optimization: {
    /**
     * moduleIds: 'deterministic' 是 Webpack 中的一个配置选项，用于控制模块 ID 的生成方式。当设置为 'deterministic' 时，
     *            Webpack 会生成确定性（deterministic）的模块 ID。
      确定性模块 ID 的优点包括：
      缓存：确定性 ID 可以确保在每次构建时生成的 ID 都相同，这对于长期缓存非常有用。这意味着浏览器可以缓存模块，并在后续构建中重用它们，从而加快加载速度。
      调试：确定性 ID 可以帮助开发者在调试时更容易地定位问题。因为模块 ID 是基于模块内容生成的，所以相同的模块内容总是会有相同的 ID，这使得调试更加直观。
      版本控制：确定性 ID 可以帮助确保在版本控制系统中，模块的更改能够被正确地追踪和比较。
     */
    // moduleIds: 'deterministic', // chunkIds: 'deterministic',
    // 尽量在生成入口 chunk 时减小其体积以提高性能。下面的配置为运行时代码创建了一个额外的 chunk，所以它的生成代价较低：
    // runtimeChunk: true,
    // webpack 通过执行额外的算法任务优化输出结果的体积和加载的性能。这些优化适用于小型代码库，但是在大型代码库中却非常耗费性能：
    // removeAvailableModules: false,
    // removeEmptyChunks: false,
    splitChunks: {
      chunks: 'all',
    },
    // splitChunks: {
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name: 'vendors',
    //       chunks: 'all',
    //     },
    //   },
    // },
  },
  /**
   * 现在，如果执行 webpack，你会发现创建了一个体积相当大的文件。查看文件可以发现 lodash 也被打包到代码中。在这种场景中，我们更倾向于把 lodash 当作 peerDependency，
   * 即使用者应该已经自行安装过 lodash，这样便可以放弃控制此外部库，将控制权让给使用此库的开发者。
   */
  externals: [
    // 'lodash', // lodash/debounce
    // 'React',
  ],
  resolve: {
    alias: {
      '@': resolveApp('src'),
      '@pages': resolveAppSrc('pages'),
      '@static': resolveAppSrc('static'),
      '@router': resolveAppSrc('router'),
      '@packages': resolve(__dirname, '../../packages'),
    },
    extensions: ['.js', '.jsx', '.json'],
  },
};
