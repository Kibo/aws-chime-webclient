const path = require('path');
const webpack = require('webpack');
require('dotenv').config()
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	mode: 'development',
	watch: true,
	cache: false,
	
	entry: {
		client: './src/app.js'
	},
	
	output: {
		filename: '[name]-chime.js',
		path: path.resolve(__dirname, 'dist'),
	},
	
	plugins: [			
		new CleanWebpackPlugin(),
		
		/*
		 * This plugin replace a string placed in src/app.js with values placed in .env
		 * @see .env 
		 */
		new webpack.NormalModuleReplacementPlugin(
  			/(.*)PATH_TO_SETTING_TEMPLATE(\.*)/,
  			function (resource) {    						
				resource.request = resource.request.replace(
					/PATH_TO_SETTING_TEMPLATE/,
					`${process.env.PATH_TO_SETTING_TEMPLATE || './settings/allFeatures.js'}`
				);
			}  			
		),
		new webpack.NormalModuleReplacementPlugin(
			/(.*)PATH_TO_VIEW_TEMPLATES(\.*)/,
			function (resource) {    						
				resource.request = resource.request.replace(
					/PATH_TO_VIEW_TEMPLATES/,
					`${process.env.PATH_TO_VIEW_TEMPLATES || './templates/html/bootstrap/v4_5'}`
				);
			}  			
		),	
	],
	
	/*
	 * Suppress create LICENCE.txt file in dist folder.
	 */		  	  	
	optimization: {
	    minimize: false,
	    minimizer: [new TerserPlugin({extractComments:false})],
  	},
  	  	
	/*
	 * This compile ejs templates
	 */	
	module: { rules:[{
			test : /\.ejs$/,
			use : {
				loader : 'ejs-compiled-loader',
				options : {
					compileDebug: true,
					beautify: true,
					htmlmin : true,
					htmlminOptions : {
						removeComments : true
					}
				}
			}
		}]
	}
};