var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var options = {
    publicPath: config.output.publicPath,
    hot: true,
    stats: {
        chunkModules: false,
        colors: true,
    },
};

new WebpackDevServer(webpack(config), options).listen(3000, 'localhost', function (err) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:3000');
});
