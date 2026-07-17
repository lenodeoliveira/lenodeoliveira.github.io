const COMMANDS = {
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

    whoami: () => `John Lennon\nSoftware Engineer\nBuilding scalable systems in the cloud.`,

    current_focus: () =>
        `- Cloud Architecture\n- AWS\n- Distributed Systems\n- AI Engineering`,

    experience: () => `6+ years building software.`,

    technologies: () =>
        `TypeScript  NestJS  AWS  MySQL  Docker  Microservices`,

    projects: () =>
        `Corvo-Zap  → https://github.com/lenodeoliveira/corvo-zap\n             // crow messenger app — send corvos to chat with friends\nNestJS Logs           // structured logging toolkit\nCMS        → https://github.com/lenodeoliveira/my_cms_blog\n             // content management system with Docker`,

    certifications: () =>
        `[AWS] Solutions Architect Associate (in progress)`,

    contact: () =>
        `GitHub   → https://github.com/lenodeoliveira\nLinkedIn → https://www.linkedin.com/in/johnlennondeoliveira/\nEmail    → lenodeoliveira@gmail.com`,

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

const BOOT_TEXT = 'Initializing portfolio shell... [OK]';
const bootLine = document.getElementById('boot-line');
const terminalForm = document.getElementById('terminal-form');
const terminalInput = document.getElementById('terminal-input');
const terminalHistory = document.getElementById('terminal-history');
const cursor = document.getElementById('cursor');
const yearEl = document.getElementById('year');
const navLinks = document.querySelectorAll('.nav-cmd');

function typeBootSequence() {
    if (!bootLine || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (bootLine) bootLine.textContent = BOOT_TEXT;
        return;
    }

    let i = 0;
    const interval = setInterval(() => {
        bootLine.textContent = BOOT_TEXT.slice(0, i);
        i++;
        if (i > BOOT_TEXT.length) clearInterval(interval);
    }, 28);
}

function scrollToSection(selector) {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateCursorPosition() {
    if (!terminalInput || !cursor) return;
    const inputLine = terminalInput.closest('.input-line');
    const prompt = inputLine.querySelector('.input-prompt');
    const promptWidth = prompt.offsetWidth;
    const textWidth = measureText(terminalInput.value, terminalInput);
    cursor.style.left = `${1.25 * 16 + promptWidth + textWidth + 4}px`;
}

function measureText(text, input) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = `${getComputedStyle(input).fontSize} ${getComputedStyle(input).fontFamily}`;
    return ctx.measureText(text).width;
}

function appendHistory(input, output, isError = false) {
    const line = document.createElement('p');
    line.className = 'history-line';

    const inputSpan = document.createElement('span');
    inputSpan.className = 'history-input';
    inputSpan.innerHTML = `<span class="typed">guest@portfolio:~$ </span>${escapeHtml(input)}`;
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

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function runCommand(raw) {
    const input = raw.trim().toLowerCase();

    if (!input) return;

    if (input === 'clear') {
        terminalHistory.innerHTML = '';
        appendHistory(raw.trim(), null);
        return;
    }

    if (SECTION_MAP[input]) {
        scrollToSection(SECTION_MAP[input]);
        appendHistory(raw.trim(), `→ scrolling to ${input}`);
        return;
    }

    const handler = COMMANDS[input];
    if (handler) {
        appendHistory(raw.trim(), handler());
        return;
    }

    appendHistory(
        raw.trim(),
        `command not found: ${input}. Type 'help' for available commands.`,
        true
    );
}

function setActiveNav() {
    const scrollPos = window.scrollY + 120;

    navLinks.forEach((link) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;

        const top = target.offsetTop;
        const bottom = top + target.offsetHeight;

        link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
    });
}

if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

typeBootSequence();

if (terminalForm && terminalInput) {
    terminalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        runCommand(terminalInput.value);
        terminalInput.value = '';
        updateCursorPosition();
    });

    terminalInput.addEventListener('input', updateCursorPosition);
    terminalInput.addEventListener('focus', () => cursor?.classList.add('focused'));
    terminalInput.addEventListener('blur', () => cursor?.classList.remove('focused'));

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            runCommand('help');
        }
    });

    updateCursorPosition();
    window.addEventListener('resize', updateCursorPosition);
}

window.addEventListener('scroll', setActiveNav, { passive: true });
setActiveNav();
