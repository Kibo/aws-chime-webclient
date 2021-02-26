const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	mode: 'development',
	plugins: [	
		new Dotenv(),	
		new CleanWebpackPlugin(),
		
		/*
		 * This plugin replace a string placed in src/app.js with values placed in .env
		 * @see .env 
		 */
		new webpack.NormalModuleReplacementPlugin(
  			/PATH_TO_SETTING_TEMPLATE/,
  			process.env.PATH_TO_SETTING_TEMPLATE || './settings/allFeatures.js'
		),
		new webpack.NormalModuleReplacementPlugin(
  			/PATH_TO_VIEW_TEMPLATE/,
  			process.env.PATH_TO_VIEW_TEMPLATE || './templates/html/bootstrap/v4_5/templates.js'
		),	
	],
			  	  	
	optimization: {
	    minimize: false,
	    minimizer: [new TerserPlugin({extractComments:false})],
  	},
  	  	
	entry: {
		client: './src/app.js'
	},
	
	output: {
		filename: '[name]-chime.js',
		path: path.resolve(__dirname, 'dist'),
		},
	watch: true,	
};