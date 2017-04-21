const webpack = require('webpack'),
	  path = require('path');

	 
module.exports={
	entry: {
		dashboard:path.resolve(__dirname, "/src/main/webapp/app/main.js")
	},
	output:{
		path: path.resolve(__dirname, "/src/main/webapp/build"),
		//filename: "[name].[chunkHash:8].js",
		filename: "[name].js",
		publicPath: "/build/"
	},
	module:{
        //loaders加载器
		loaders:[
			{test: /\.css$/, loader: "style!css"},
			{
                test: /\.(js|jsx)$/,//一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
				exclude: /(node_modules|bower_components)/,//屏蔽不需要处理的文件（文件夹）（可选）
				loader: 'babel'//loader的名称（必须）
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