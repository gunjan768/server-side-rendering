// import React from 'react';
import App from './App';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminsListPage from './pages/AdminsListPage';

// As path prop is not mentioned in the App hence it will render no matter what. This routes array is a child of App component i.e whenever
// your will ask for the route which is in this routes array then the asked component will be rendered inside the App component.
export default [
{
	...App,
	routes: [
	{
		...HomePage,
		path: '/',
		exact: true
	},
	{
		...AdminsListPage,
		path: '/admins'
	},
	{
		...UsersListPage,
		path: '/users'
	},
	{
		...NotFoundPage
	}]
}];