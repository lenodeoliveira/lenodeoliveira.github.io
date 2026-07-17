import { portfolio } from '../../data/portfolio.js';
import { cmdBlock } from '../cmd-block.js';

export function renderContact() {
    const links = portfolio.contact
        .map(({ label, url, external }) => {
            const attrs = external
                ? 'target="_blank" rel="noopener noreferrer"'
                : '';

            return `
                <a href="${url}" ${attrs} class="contact-link">
                    <span class="link-prefix">$</span> ${label}
                </a>
            `;
        })
        .join('');

    return cmdBlock({
        id: 'contact',
        command: 'contact',
        output: `<div class="cmd-output contact-links">${links}</div>`,
    });
}
