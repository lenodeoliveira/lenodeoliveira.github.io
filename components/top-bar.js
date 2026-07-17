import { portfolio } from '../data/portfolio.js';

export function renderTopBar() {
    const links = portfolio.nav
        .map(
            ({ href, cmd, label }) =>
                `<a href="${href}" class="nav-cmd" data-cmd="${cmd}">${label}</a>`
        )
        .join('');

    return `
        <header class="top-bar">
            <nav class="nav-commands" aria-label="Site navigation">
                ${links}
            </nav>
        </header>
    `;
}
