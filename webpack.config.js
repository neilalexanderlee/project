const webpack = require('webpack'),
	  path = require('path');

	 
module.exports={
	entry: {
		dashboard:path.resolve(__dirname, "./src/main/webapp/apps/brokerage/js/main.js")
	},
	output:{
		path: path.resolve(__dirname, "./src/main/webapp/apps/brokerage/build"),
		//filename: "[name].[chunkHash:8].js",
		filename: "[name].js",
		publicPath: "/build/"
	},
	module:{
		loaders:[
			{test: /\.css$/, loader: "style!css"},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel',
				query: {
				  presets: ['es2015'],
				  plugins: ["transform-class-properties"]
				}
			},
			{test: /\.(jpg|png)$/, loader: "url?limit=8192"}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({minimize: true, compress: {warnings: true}}),
	],
	resolve:{
			extensions:['','.js','.json'],
			root: path.resolve(__dirname, "js"),
			alias : {
			  css : path.resolve(__dirname, "css")
			}
	},
	externals: {
      'angular': 'window.angular' 
    },
};