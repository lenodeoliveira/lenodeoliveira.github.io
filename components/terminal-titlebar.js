import { portfolio } from '../data/portfolio.js';

export function renderTerminalTitlebar() {
    const { windowTitle, status } = portfolio.terminal;

    return `
        <div class="terminal-titlebar">
            <div class="window-controls">
                <span class="control control-close"></span>
                <span class="control control-minimize"></span>
                <span class="control control-maximize"></span>
            </div>
            <span class="window-title">${windowTitle}</span>
            <span class="window-status">${status}</span>
        </div>
    `;
}
