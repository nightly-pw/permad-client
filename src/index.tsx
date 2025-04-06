import { createRoot } from 'react-dom/client';
import { Game } from "./game";
import MainMenu from './react/MainMenu';
import App from './react/App';

new Game().start();

const container = document.getElementById('ui');
const root = createRoot(container);
root.render(<App></App>);