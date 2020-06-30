// serialize() is a function which is used to protect the app against XSS attack by removing all the escape sequences.
import serialize from 'serialize-javascript';

export const renderHTML = (helmet, store, content) =>
{
    // In the global variable we are storing the initial state of the store so that the same state can we used to hydrate on the client side.
    return `
		<html>
		<head>
			${ helmet.title.toString() }
			${ helmet.meta.toString() }
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
		</head>
		<body>
			<div id="root">${ content }</div>
			<script>
				window.INITIAL_STATE = ${ serialize(store.getState()) }
			</script>
			<script src="bundle.js"></script>
		</body>
		</html>
	`;
}