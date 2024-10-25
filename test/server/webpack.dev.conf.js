const commonConfig = require('./webpack.common.conf');
const merge = require('webpack-merge').default;
const WebpackBar = require('webpackbar');

const devConfig = {
  mode: 'development',
  watchOptions: {
    // aggregateTimeout: 200,
    // poll: 1000,
    stdin: true,
    ignored: /node_modules/,
  },
  devtool: 'inline-source-map',
  devServer: {
    // client: {
    //   logging: 'info',
    // },
    // open: true,
    // 该配置项允许配置从目录提供静态文件的选项（默认是 'public' 文件夹）。将其设置为 false 以禁用：
    static: 'public',
    hot: true,
    port: 8081,
    // 说明: 配置允许访问开发服务器的主机名。
    // allowedHosts: undefined,
    // 这个配置用于在启动时通过 ZeroConf 网络广播你的开发服务器。
    // bonjour: false,
    // 说明: 配置客户端选项，如 overlay（错误覆盖）等。
    client: undefined,
    // 启用 gzip 压缩，以加快资源加载速度。
    compress: true,
    // https://webpack.docschina.org/configuration/dev-server#devserverdevmiddleware
    // 内置一个中间件的配置
    //   devMiddleware?,
    // 说明: 配置自定义 HTTP 响应头。
    // headers: {},
    // 说明: 启用 HTTPS，可以是一个布尔值或包含证书和密钥的对象。
    // https: false, 不存在这个配置项
    // 当使用 HTML5 History API 时，所有 404 请求都会响应 index.html。
    historyApiFallback: false,
    // 指定开发服务器的主机名。
    host: '127.0.0.1',
    // 启用或禁用热模块替换（HMR）。HMR 可以在不完全刷新页面的情况下更新模块，从而提高开发效率。
    hot: true,
    // https://webpack.docschina.org/configuration/dev-server/#devserveripc
    // 将其设置为 true 将会监听 /your-os-temp-dir/webpack-dev-server.sock 的 socket：
    // ipc: true,
    // 默认情况下，当监听到文件变化时 dev-server 将会重新加载或刷新页面。为了 liveReload 能够生效，
    // devServer.hot 配置项必须禁用或者 devServer.watchFiles 配置项必须启用。将其设置为 false 以禁用 devServer.liveReload：
    // 说明: 启用或禁用实时重新加载。
    // liveReload: false,
    // 提供在 webpack-dev-server 开始监听端口连接时执行自定义函数的能力。
    // onListening: undefined,
    // 允许设置服务器和配置项（默认为 'http'）。
    // server: 'http',
    // 允许在 SIGINT 和 SIGTERM 信号时关闭开发服务器和退出进程。
    // setupExitSignals: true,
    // 提供执行自定义函数和应用自定义中间件的能力。
    // setupMiddlewares: undefined,
    // 说明: 指定要监听的文件或目录，当这些文件发生变化时，会触发重新编译。
    // watchFiles: [resolveApp('build'), resolveApp('src')],

    // 该配置项允许我们选择当前的 web-socket 服务器或者提供自定义的 web-socket 服务器实现。
    // webSocketServer: 'ws',
    proxy: [
      {
        context: ['/api/dqy'],
        target: 'http://192.168.206.219:9093', // 开发环境
        // secure: false,
        // logLevel: 'debug',
        changeOrigin: true,
        pathRewrite: {
          '^/api/dqy': '/',
        },
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
  },
  plugins: [
    //   进度条
    new WebpackBar({
      name: 'My App',
      color: '#1DA57A',
    }),
    /**
     *  ******  Eslint Options ******
     *  cwd?: string | undefined;
        errorOnUnmatchedPattern?: boolean | undefined;
        extensions?: string[] | undefined;
        globInputPaths?: boolean | undefined;
        ignore?: boolean | undefined;
        ignorePath?: string | undefined;

        // Linting
        allowInlineConfig?: boolean | undefined;
        baseConfig?: Linter.Config | undefined;
        overrideConfig?: Linter.Config | undefined;
        overrideConfigFile?: string | undefined;
        plugins?: Record<string, Plugin> | undefined;
        reportUnusedDisableDirectives?: Linter.StringSeverity | undefined;
        resolvePluginsRelativeTo?: string | undefined;
        rulePaths?: string[] | undefined;
        useEslintrc?: boolean | undefined;

        // Autofix
        fix?: boolean | ((message: Linter.LintMessage) => boolean) | undefined;
        fixTypes?: Array<Rule.RuleMetaData["type"]> | undefined;

        ******  plugin Options ******

        // Cache-related
        cache?: boolean | undefined;
        cacheLocation?: string | undefined;
        cacheStrategy?: "content" | "metadata" | undefined;

        context?: string | undefined;
        emitError?: boolean | undefined;
        emitWarning?: boolean | undefined;
        eslintPath?: string | undefined;
        exclude?: (string | string[]) | undefined;
        extensions?: (string | string[]) | undefined;
        failOnError?: boolean | undefined;
        failOnWarning?: boolean | undefined;
        files?: (string | string[]) | undefined;
        fix?: boolean | undefined;
        formatter?: (string | FormatterFunction) | undefined;
        lintDirtyModulesOnly?: boolean | undefined;
        quiet?: boolean | undefined;
        outputReport?: OutputReport | undefined;
        threads?: (number | boolean) | undefined;
        resourceQueryExclude?: (RegExp | RegExp[]) | undefined;
        configType?: string | undefined;
     */
    // new ESLintPlugin({
    //   // fix: true,
    //   extensions: ['.js', '.jsx'],
    //   exclude: ['node_modules', 'build', 'dist'],
    //   formatter: 'eslint-friendly-formatter',
    //   cache: true, // 开启缓存
    //   cacheLocation: 'node_modules/.cache/.eslintcache',
    //   lintOnSave: true,
    //   lintDuringBuilds: true,
    // }),
  ],
};
module.exports = merge(commonConfig, devConfig);
