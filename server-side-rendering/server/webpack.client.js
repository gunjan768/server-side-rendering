const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const config = 
{
	mode: "development",
	
	// Tell webpack the root file of our server application.
	entry: './src/client/client.js',

	// Tell webpack where to put the output file that is generated.
	output: 
	{
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public')
	}
};

// merge() will help to merge two files that are listed ( here baseConfig and config).
module.exports = merge(baseConfig, config);