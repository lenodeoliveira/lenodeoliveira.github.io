import { portfolio } from '../data/portfolio.js';
import { renderTopBar } from '../components/top-bar.js';
import { renderTerminalWindow } from '../components/terminal-window.js';
import { renderFooter } from '../components/footer.js';
import { initTerminal } from './terminal.js';

function renderApp() {
    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = `
        ${renderTopBar()}
        <main class="page">
            ${renderTerminalWindow()}
        </main>
        ${renderFooter()}
    `;
}

function setMeta() {
    document.title = portfolio.meta.title;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
        description.setAttribute('content', portfolio.meta.description);
    }
}

setMeta();
renderApp();
initTerminal();
