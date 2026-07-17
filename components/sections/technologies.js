import { portfolio } from '../../data/portfolio.js';
import { cmdBlock } from '../cmd-block.js';

export function renderTechnologies() {
    const tags = portfolio.technologies
        .map((tech) => `<span class="tech-tag">${tech}</span>`)
        .join('');

    return cmdBlock({
        id: 'technologies',
        command: 'technologies',
        output: `<div class="cmd-output tech-grid">${tags}</div>`,
    });
}
