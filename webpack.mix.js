const mix = require('laravel-mix');
require('laravel-mix-nunjucks');

mix
  .njk('./src/views', 'dist/', {
    manageEnv(nunjucks) {
      nunjucks.addFilter('version', (filename) => {
        return `${filename}?hash=${Date.now()}`;
      });
    },
  })
  .copyDirectory('src/assets', 'dist')
  .sass('./src/styles/app.scss', '/')
  .js('./src/scripts/app.js', '/')
  .options({
    processCssUrls: false,
    sassOptions: {
      outputStyle: 'nested',
    },
    autoprefixer: { remove: false },
    terser: {
      extractComments: false,
    },
    manifest: false,
  })
  .setPublicPath('dist');

if (!mix.inProduction()) {
  mix
    .browserSync({
      notify: false,
      server: 'dist',
      proxy: null,
      open: false,
      watch: true,
      files: ['./src/**/*'],
    })
    .disableSuccessNotifications()
    .sourceMaps()
    .webpackConfig({ devtool: 'inline-source-map' });
}
