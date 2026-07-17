import { portfolio } from '../../data/portfolio.js';
import { cmdBlock } from '../cmd-block.js';

export function renderFocus() {
    const items = portfolio.focus.map((item) => `<li>${item}</li>`).join('');

    return cmdBlock({
        id: 'focus',
        command: 'current_focus',
        output: `<ul class="cmd-output list-output">${items}</ul>`,
    });
}
