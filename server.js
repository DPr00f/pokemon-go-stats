'use strict';
/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const bodyParser = require('body-parser');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
const ProfileController = require('./appServer/controllers/Profile');
let ResponseController = (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
};

// ---- SETUP MIDDLEWARES & DEV ---- //
if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  ResponseController = (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  };
} else {
  app.use(express.static(__dirname + '/dist'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ---- ROUTES ---- //
app.post('/api/profile', ProfileController.route);
app.get('*', ResponseController);

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
