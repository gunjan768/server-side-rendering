// 'babel-polyfill' is used so that it can define 'regenerator runtime' so that we can use 'async await' keywords. 
import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

// Whenever webpack sees the import statement it will go and grab all the codes that represent the modules and put the entire library into 
// the bundle and that we how want webpack to work for the browser app.
const app = express();

// This whole setup of proxy is used to login using google auth using API built by someone else. If you wabnt write the code then you can and
// avoid using this whole setup.
app.use('/api', proxy('http://react-ssr-api.herokuapp.com', 
{
	proxyReqOptDecorator(opts) 
	{
		// 'localhost:3000' here is used so that after login it will redirect to this domain.
		opts.headers['x-forwarded-host'] = 'localhost:3000';
		
		return opts;
    }
}));

app.use(express.static('public'));

app.get('*', (req, res) => 
{
	const store = createStore(req);

	// console.log(matchRoutes(Routes, req.path))
	 
	// matchRoute() will take path where you want to go as a second argument and routes array as a first argument and will return an array of
	// objects where each object contains two nested objects named 'route' and 'match'. loadData() function of each and every component will 
	// run here if present. And every loadData() function will take store as an argument. loadData() is used to fetch things using action 
	// creator and reducers.
	const promises = matchRoutes(Routes, req.path).map(({ route }) => 
	{
		return route.loadData ? route.loadData(store) : null;
	})
	.map(promise => 
	{
		if(promise) 
		{
			return new Promise((resolve, reject) => 
			{
				promise.then(resolve).catch(resolve);
			});
		}
	});
	
	Promise.all(promises).then(() => 
	{
		const context = {};
		const content = renderer(req, store, context);

		// The HyperText Transfer Protocol (HTTP) 301 Moved Permanently redirect status response code indicates that the resource requested 
		// has been definitively moved to the URL given by the Location headers.
		if(context.url) 
		{
			return res.redirect(301, context.url);
		}

		if(context.notFound) 
		{
			res.status(404);
		}

		res.send(content);
	});
});

app.listen(3000, () => 
{
  	console.log('Listening on prot 3000');
});