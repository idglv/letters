const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const PATHS = {
    app: path.join(__dirname, 'src/'),
    build: path.join(__dirname, 'build/'),
    style: path.join(__dirname, 'src/style/'),
    index: path.join(__dirname, 'assets/index.html')
};

module.exports = {
    entry: PATHS.app,
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel'],
            exclude: /node_modules/
        },{
            test: /\.styl$/,
            loaders: ['style', 'css', 'postcss', 'stylus'],
            include: PATHS.style
        }]
    },
    progress: true,
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
    plugins: [
        new HtmlWebpackPlugin({
            title: 'mp1',
            template: PATHS.index
        })
    ]
}

