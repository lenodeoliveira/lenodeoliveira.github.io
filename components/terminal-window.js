import { renderTerminalTitlebar } from './terminal-titlebar.js';
import { renderWhoami } from './sections/whoami.js';
import { renderFocus } from './sections/focus.js';
import { renderExperience } from './sections/experience.js';
import { renderTechnologies } from './sections/technologies.js';
import { renderProjects } from './sections/projects.js';
import { renderCertifications } from './sections/certifications.js';
import { renderContact } from './sections/contact.js';
import { renderInteractiveTerminal } from './sections/interactive-terminal.js';

export function renderTerminalWindow() {
    return `
        <div class="terminal-window">
            ${renderTerminalTitlebar()}
            <div class="terminal-body">
                <p class="boot-line" id="boot-line"></p>
                ${renderWhoami()}
                ${renderFocus()}
                ${renderExperience()}
                ${renderTechnologies()}
                ${renderProjects()}
                ${renderCertifications()}
                ${renderContact()}
                ${renderInteractiveTerminal()}
            </div>
        </div>
    `;
}
