const { createServer } = require('http');
const next = require('next');

const app = next({
  dev: process.env.NODE_ENV !== 'production',
  conf: {
    webpack: config => {
      config.devtool = false;

      for (const r of config.module.rules) {
        if (r.loader === 'babel-loader') {
          r.options.sourceMaps = false;
        }
      }

      return config;
    }
  }
});
const routes = require('./routes');
const handler = routes.getRequestHandler(app);
// const withCSS = require('@zeit/next-css');
// module.exports = withCSS();

app.prepare().then(() => {
  createServer(handler).listen(3200, err => {
    if (err) throw err;
    console.log('Ready on localhost:3200');
  });
});