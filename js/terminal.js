import { portfolio } from '../data/portfolio.js';

function buildCommands() {
    const { whoami, focus, experience, technologies, projects, certifications, contact } =
        portfolio;

    const projectsOutput = projects
        .map(({ name, url, description }) => {
            const link = url ? `  → ${url}\n             ` : '';
            return `${name.padEnd(12)}${link}${description}`;
        })
        .join('\n');

    const contactOutput = contact
        .map(({ label, url }) => `${label.padEnd(9)}→ ${url.replace('mailto:', '')}`)
        .join('\n');

    return {
        help: () =>
            `Available commands:
  whoami          — identity & role
  current_focus   — what I'm working on
  experience      — years in the field
  technologies    — tech stack
  projects        — notable work
  certifications  — certs & progress
  contact         — ways to reach me
  clear           — wipe terminal history
  date            — current timestamp
  neofetch        — system info (just for fun)`,

        whoami: () =>
            `${whoami.name}\n${whoami.role}\n${whoami.tagline}`,

        current_focus: () => focus.map((item) => `- ${item}`).join('\n'),

        experience: () => experience,

        technologies: () => technologies.join('  '),

        projects: () => projectsOutput,

        certifications: () =>
            certifications
                .map(({ badge, name, status }) => `[${badge}] ${name} (${status})`)
                .join('\n'),

        contact: () => contactOutput,

        clear: () => null,

        date: () => new Date().toString(),

        neofetch: () =>
            `     ██╗ ██████╗ ██╗  ██╗███╗   ██╗
     ██║██╔═══██╗██║  ██║████╗  ██║
     ██║██║   ██║███████║██╔██╗ ██║
██   ██║██║   ██║██╔══██║██║╚██╗██║
╚█████╔╝╚██████╔╝██║  ██║██║ ╚████║
 ╚════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝

OS:     portfolio-linux 6.18
Host:   john@cloud
Kernel: NestJS 10.x / Node.js
Uptime: 6+ years
Shell:  geek-mode
Theme:  dracula-terminal`,
    };
}

const SECTION_MAP = {
    whoami: '#whoami',
    current_focus: '#focus',
    focus: '#focus',
    experience: '#experience',
    technologies: '#technologies',
    tech: '#technologies',
    projects: '#projects',
    certifications: '#certifications',
    certs: '#certifications',
    contact: '#contact',
};

function typeBootSequence(bootLine) {
    const bootText = portfolio.terminal.bootText;

    if (!bootLine || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (bootLine) bootLine.textContent = bootText;
        return;
    }

    let i = 0;
    const interval = setInterval(() => {
        bootLine.textContent = bootText.slice(0, i);
        i++;
        if (i > bootText.length) clearInterval(interval);
    }, 28);
}

function scrollToSection(selector) {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function measureText(text, input) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = `${getComputedStyle(input).fontSize} ${getComputedStyle(input).fontFamily}`;
    return ctx.measureText(text).width;
}

function updateCursorPosition(terminalInput, cursor) {
    if (!terminalInput || !cursor) return;

    const inputLine = terminalInput.closest('.input-line');
    const prompt = inputLine.querySelector('.input-prompt');
    const promptWidth = prompt.offsetWidth;
    const textWidth = measureText(terminalInput.value, terminalInput);
    cursor.style.left = `${1.25 * 16 + promptWidth + textWidth + 4}px`;
}

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function appendHistory(terminalHistory, input, output, isError = false) {
    const line = document.createElement('p');
    line.className = 'history-line';

    const inputSpan = document.createElement('span');
    inputSpan.className = 'history-input';
    inputSpan.innerHTML = `<span class="typed">${portfolio.terminal.inputPrompt} </span>${escapeHtml(input)}`;
    line.appendChild(inputSpan);

    if (output !== null) {
        const outputSpan = document.createElement('span');
        outputSpan.className = isError ? 'history-error' : 'history-output';
        outputSpan.textContent = output;
        line.appendChild(document.createElement('br'));
        line.appendChild(outputSpan);
    }

    terminalHistory.appendChild(line);
    terminalHistory.scrollTop = terminalHistory.scrollHeight;
}

function runCommand(raw, commands, terminalHistory) {
    const input = raw.trim().toLowerCase();
    if (!input) return;

    if (input === 'clear') {
        terminalHistory.innerHTML = '';
        appendHistory(terminalHistory, raw.trim(), null);
        return;
    }

    if (SECTION_MAP[input]) {
        scrollToSection(SECTION_MAP[input]);
        appendHistory(terminalHistory, raw.trim(), `→ scrolling to ${input}`);
        return;
    }

    const handler = commands[input];
    if (handler) {
        appendHistory(terminalHistory, raw.trim(), handler());
        return;
    }

    appendHistory(
        terminalHistory,
        raw.trim(),
        `command not found: ${input}. Type 'help' for available commands.`,
        true
    );
}

function setActiveNav(navLinks) {
    const scrollPos = window.scrollY + 120;

    navLinks.forEach((link) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;

        const top = target.offsetTop;
        const bottom = top + target.offsetHeight;
        link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
    });
}

export function initTerminal() {
    const commands = buildCommands();
    const bootLine = document.getElementById('boot-line');
    const terminalForm = document.getElementById('terminal-form');
    const terminalInput = document.getElementById('terminal-input');
    const terminalHistory = document.getElementById('terminal-history');
    const cursor = document.getElementById('cursor');
    const yearEl = document.getElementById('year');
    const navLinks = document.querySelectorAll('.nav-cmd');

    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    typeBootSequence(bootLine);

    if (terminalForm && terminalInput) {
        terminalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            runCommand(terminalInput.value, commands, terminalHistory);
            terminalInput.value = '';
            updateCursorPosition(terminalInput, cursor);
        });

        terminalInput.addEventListener('input', () =>
            updateCursorPosition(terminalInput, cursor)
        );
        terminalInput.addEventListener('focus', () => cursor?.classList.add('focused'));
        terminalInput.addEventListener('blur', () => cursor?.classList.remove('focused'));

        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                runCommand('help', commands, terminalHistory);
            }
        });

        updateCursorPosition(terminalInput, cursor);
        window.addEventListener('resize', () =>
            updateCursorPosition(terminalInput, cursor)
        );
    }

    window.addEventListener('scroll', () => setActiveNav(navLinks), { passive: true });
    setActiveNav(navLinks);
}
