const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const config = 
{
	mode: "development",

	// The environment in which the bundle should run. Inform webpack that we're building a bundle for the server ( nodeJS ), rather than for 
	// the browser.
	target: 'node',

	// Tell webpack the root file of our server application.
	entry: './src/index.js',

	// Tell webpack where to put the output file that is generated.
	output: 
	{
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build')
	},

	// It will avoid injecting any packages in the server-side bundle that are present in the node_modules folder. When bundling with Webpack 
	// for the backend - you usually don't want to bundle its node_modules dependencies. This library creates an externals function that 
	// ignores node_modules when bundling in Webpack.
	externals: [webpackNodeExternals()],
};

// webpack-merge provides a merge function that concatenates arrays and merges objects creating a new object. If functions are encountered, it 
// will execute them, run the results through the algorithm, and then wrap the returned values within a function again. This behavior is 
// particularly useful in configuring webpack although it has uses beyond it. Whenever you need to merge configuration objects, webpack-merge 
// can come in handy.
module.exports = merge(baseConfig, config);