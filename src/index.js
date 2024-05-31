import ReactDOMClient from 'react-dom/client';
import App from './components/App';

ReactDOMClient
	.createRoot(document.getElementById('root'))
	.render(<App />);