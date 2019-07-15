const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const views = path.join(__dirname, 'public');
const lib = [
    'react-redux',
    'react-router-dom',
    'redux',
    'redux-thunk',
    'react',
    'react-dom',
];
module.exports = {
    mode: 'production',
    entry: {
        lib: lib
    },
    output: {
        path: views,
        filename: 'common/[name].js',
        library: '[name]',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(views, 'common/manifest.json'),
            name: '[name]',
            context: __dirname
        }),
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
    ]
};