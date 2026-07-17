import { portfolio } from '../data/portfolio.js';

export function renderFooter() {
    return `
        <footer class="footer">
            <p>
                <span class="prompt">&gt;</span>
                exit 0 — &copy; <span id="year"></span> ${portfolio.footer.name}
            </p>
        </footer>
    `;
}
