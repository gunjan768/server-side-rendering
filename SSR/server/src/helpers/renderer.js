import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from '../client/Routes';
import { renderHTML } from './renderServer';

// This reusable React component will manage all of your changes to the document head.
import { Helmet } from 'react-helmet';

// renderRoutes() is a function which will convert an array of routes to our classic routes.
import { renderRoutes } from 'react-router-config';

export default (req, store, context) => 
{
	const content = renderToString(
		<Provider store = { store }>
			<StaticRouter location = { req.path } context = { context }>
				<div>{ renderRoutes(Routes) }</div>
			</StaticRouter>
		</Provider>
	);
	
	// All the head tages which are present in Helmet tag is taken out and assigned to a variable 'helmet' using renderStatic() function.
	const helmet = Helmet.renderStatic();

	return renderHTML(helmet, store, content);
}