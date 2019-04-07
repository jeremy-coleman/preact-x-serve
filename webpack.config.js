const { resolve } = require('path');
var path = require('path')
const webpack = require('webpack');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const WebpackModules = require('./wpmodules')
const TsPathPlugin = require('tsconfig-paths-webpack-plugin')
const watch = process.env.NODE_ENV === 'development';
const outputPath = resolve(__dirname, 'dist', 'app');
var nodeExternals = require('webpack-node-externals')
const ENTRY_FILE = './src/index.tsx'
const HTML_TEMPLATE = "./src/index.html"



module.exports = {
  mode: 'development',
  //mode: process.env.NODE_ENV,
  stats:"minimal",
  target: "web",
  //devtool: 'inline-source-map',
  //externals: nodeExternals(),
  //externals,

	node: {
		process: 'mock',
		Buffer: false,
		setImmediate: false
  },
  
  entry: [ENTRY_FILE, 'webpack-plugin-serve/client'],
  output: {
    path: outputPath,
    publicPath: '/',
    filename: 'client.js'
  },
	resolve: {
    extensions: ['.jsx', '.js', '.json', '.mjs', '.ts', '.tsx'],
    alias: {
    'react': 'preact/compat',
    // //'mobx-react': 'mobx-preact',
    'react-dom': 'preact/compat'
    // //path.join(__dirname, "node_modules/preact/compat/dist/compat.umd.js")
     },

    plugins:[
      new TsPathPlugin()
    ]
	},
  module: {
    rules: [
      {test: /\.[tj]sx?$/,use:[{loader: 'ts-loader', options: {transpileOnly: true}}],exclude: /node_modules/},
      //{test: /\.mjs?$/,use:[]},
      //{test: /\.s?css$/,use: ['style-loader','css-loader','sass-loader']},
      {test: /\.css$/,use: ['style-loader','css-loader']},
      {test: /\.woff(\?.*)?$/,use: {loader: 'file-loader',options: {name: 'fonts/[name].[ext]',mimetype: 'application/font-woff'}}},
      {test: /\.woff2(\?.*)?$/,use: {loader: 'file-loader', options: {name: 'fonts/[name].[ext]',mimetype: 'application/font-woff2'}}},
      {test: /\.(otf|eot)(\?.*)?$/,use: {loader: 'file-loader',options: {name: 'fonts/[name].[ext]'}}},
      {test: /\.ttf(\?.*)?$/,use: { loader: 'file-loader',options: {name: 'fonts/[name].[ext]',mimetype: 'application/octet-stream'}}},
      {test: /\.svg(\?.*)?$/,use: {loader: 'file-loader',options: {name: 'images/[name].[ext]',mimetype: 'image/svg+xml'}}},
      {test: /\.(png|jpg)(\?.*)?$/,use: {loader: 'file-loader',options: {name: 'images/[name].[ext]'}}}
    ]
  },
  plugins: [
    //new WebpackModules(),
    new HtmlWebpackPlugin({template: HTML_TEMPLATE}),
    new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)}}),
    //new webpack.NamedModulesPlugin(),
    new Serve({
      hmr: true,
      host: "localhost",
      progress: false,
      historyFallback: true,
      static: [outputPath]
    })
  ],
  watch
};
