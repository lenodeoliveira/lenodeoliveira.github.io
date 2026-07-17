import { portfolio } from '../../data/portfolio.js';
import { cmdBlock } from '../cmd-block.js';

export function renderCertifications() {
    const certs = portfolio.certifications
        .map(
            ({ badge, name, status }) => `
                <p class="cmd-output cert-line">
                    <span class="cert-badge">${badge}</span>
                    ${name}
                    <span class="status-pill">${status}</span>
                </p>
            `
        )
        .join('');

    return cmdBlock({
        id: 'certifications',
        command: 'certifications',
        output: certs,
    });
}
