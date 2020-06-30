import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './components/Header';
import { fetchCurrentUser } from './actions';

// Whenever any component is asked for render then it will come here to match the path.
const App = ({ route }) => 
{
	return (
		<div>
			
			<Header />
			
			{
				// renderRoutes() is a function which will convert an array of routes to our classic routes.
				renderRoutes(route.routes)
			}

		</div>
	);
}

export default { 
	component: App, 
	loadData: ({ dispatch }) => dispatch(fetchCurrentUser()) 
};