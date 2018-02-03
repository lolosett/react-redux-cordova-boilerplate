const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  //base directory/absolute path
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './app.js'
  },
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist')
  },
  devServer: {
    port: 1200,
    //tell the server where to serve static content from
    contentBase: path.resolve(__dirname, "dist/assets/media"),
    //hot module replacement
    hot: true,
    //show running processes in console
    progress: true
  },
  devtool: 'source-map',
  module: {
    rules: [{
			test: /\.jsx?$/,
			loader: 'babel-loader?cacheDirectory',
			exclude: '/node_modules/',
			include: path.join(__dirname, 'app')
		},{
			test: /\.less$/,
			use: [
				'style-loader',
				'css-loader',
				'less-loader'
			]
		},{
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader'
			]
		},
    {
			test: /\.(png|jpg|gif)$/,
			loader: 'url-loader'
		}],
  },
  plugins: [
			new webpack.LoaderOptionsPlugin({
				debug: true
			}),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery'
			}),
      new CleanWebpackPlugin(['dist']),
      //html-webpack-plugin instantiation
      new HtmlWebpackPlugin({
        template: 'index.html'
      })
		]
};

//we’re using node.js and webpack uses the modular pattern,
  //we first need to export the configuration object
module.exports = config;
