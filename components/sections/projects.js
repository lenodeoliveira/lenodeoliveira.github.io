import { portfolio } from '../../data/portfolio.js';
import { cmdBlock } from '../cmd-block.js';

function renderProject({ name, url, description }) {
    const nameEl = url
        ? `<a href="${url}" target="_blank" rel="noopener noreferrer" class="project-name">${name}</a>`
        : `<span class="project-name">${name}</span>`;

    return `
        <li>
            ${nameEl}
            <span class="project-desc">${description}</span>
        </li>
    `;
}

export function renderProjects() {
    const items = portfolio.projects.map(renderProject).join('');

    return cmdBlock({
        id: 'projects',
        command: 'projects',
        output: `<ul class="cmd-output project-list">${items}</ul>`,
    });
}
