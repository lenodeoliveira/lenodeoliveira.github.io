import { portfolio } from '../../data/portfolio.js';
import { cmdBlock } from '../cmd-block.js';

function renderCertHighlight() {
    const cert = portfolio.certifications.find(({ status }) => status === 'verified');
    if (!cert) return '';

    const { badge, name, status, credlyUrl } = cert;

    return `
        <p class="whoami-cert">
            <span class="cert-badge">${badge}</span>
            <a
                href="${credlyUrl}"
                target="_blank"
                rel="noopener noreferrer"
                class="whoami-cert-link"
            >${name}</a>
            <span class="status-pill">${status}</span>
        </p>
    `;
}

export function renderWhoami() {
    const { name, role, tagline } = portfolio.whoami;

    return cmdBlock({
        id: 'whoami',
        command: 'whoami',
        output: `
            <div class="cmd-output">
                <h1 class="name">${name}</h1>
                <p class="role">${role}</p>
                <p class="tagline">${tagline}</p>
                ${renderCertHighlight()}
            </div>
        `,
    });
}
