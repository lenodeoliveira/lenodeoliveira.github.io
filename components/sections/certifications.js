import { portfolio } from '../../data/portfolio.js';
import { cmdBlock } from '../cmd-block.js';

function renderCert({ badge, name, status, credlyUrl, imageUrl }) {
    const badgeImage =
        credlyUrl && imageUrl
            ? `
                <a
                    href="${credlyUrl}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="credly-badge-link"
                    aria-label="View ${name} on Credly"
                >
                    <img
                        src="${imageUrl}"
                        alt="AWS Certified ${name}"
                        class="credly-badge-img"
                        width="120"
                        height="120"
                        loading="lazy"
                    />
                </a>
            `
            : '';

    return `
        <div class="cert-entry">
            ${badgeImage}
            <p class="cert-line">
                <span class="cert-badge">${badge}</span>
                ${name}
                <span class="status-pill">${status}</span>
            </p>
        </div>
    `;
}

export function renderCertifications() {
    const certs = portfolio.certifications.map(renderCert).join('');

    return cmdBlock({
        id: 'certifications',
        command: 'certifications',
        output: `<div class="cmd-output cert-list">${certs}</div>`,
    });
}
