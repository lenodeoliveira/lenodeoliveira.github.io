import { portfolio } from '../../data/portfolio.js';
import { cmdBlock } from '../cmd-block.js';

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
            </div>
        `,
    });
}
