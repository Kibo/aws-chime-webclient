const webpack = require('webpack');
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const package = require("./package.json");
var banner = package.name + ' - ' + package.version;

module.exports = (env = {}) => ({
	watch: env.prod ? false : true,
	mode: env.prod ? "production" : "development",
	devtool: env.prod ? "source-map" : "cheap-module-eval-source-map",

	entry: {
		client: './src/main.js'
	},
	output: {
		filename: '[name]-chime.js',
		path: path.resolve(__dirname, "./dist/js/chime/"),
		publicPath: "/js/chime/"
	},
	resolve: {
		alias: {
		// this isn't technically needed, since the default `vue` entry for bundlers
		// is a simple `export * from '@vue/runtime-dom`. However having this
      // extra re-export somehow causes webpack to always invalidate the module
      // on the first HMR update and causes the page to reload.
      vue: "@vue/runtime-dom"
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
			{
        test: /\.worker\.js$/,
	      loader: "worker-loader",
				options: {
					filename: '[name].js',
					esModule: false,
				}
      },
      {
        test: /\.png$/,
        use: {
          loader: "url-loader",
          options: { limit: 8192 }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: !env.prod }
          },
          "css-loader"
        ]
      },
      {
        test: /\.stylus$/,
        use: ["vue-style-loader", "css-loader", "stylus-loader"]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
		new webpack.BannerPlugin( banner )
  ]
});
