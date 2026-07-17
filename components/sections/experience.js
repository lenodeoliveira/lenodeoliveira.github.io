import { portfolio } from '../../data/portfolio.js';
import { cmdBlock } from '../cmd-block.js';

export function renderExperience() {
    return cmdBlock({
        id: 'experience',
        command: 'experience',
        output: `<p class="cmd-output">${portfolio.experience}</p>`,
    });
}
