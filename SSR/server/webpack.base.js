module.exports = 
{
	// These options determine how the different types of modules within a project will be treated. Tell webpack to run babel on every file it 
	// runs through. 
	module: 
	{
		rules: [
		{
			test: /\.js?$/,

			// flags to apply these rules, even if they are overridden (advanced option).
			loader: 'babel-loader',

			exclude: /node_modules/,
			options: 
			{
				presets: [
					'@babel/react', 
					'@babel/preset-env',
					
					// last 2 versions means that support only the last two versions of the browsers that you are using.
					// ['env', { targets: { browsers: ['last 2 versions'] } }]
				]
			}
		}]
	}
};