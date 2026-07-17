export function renderInteractiveTerminal() {
    return `
        <div class="interactive-terminal" id="interactive-terminal">
            <p class="cmd-prompt interactive-label">
                <span class="prompt">&gt;</span>
                <span class="cmd-name">shell</span>
                <span class="hint">// type a command or press Tab</span>
            </p>
            <div class="terminal-history" id="terminal-history" aria-live="polite"></div>
            <form class="input-line" id="terminal-form" autocomplete="off">
                <label for="terminal-input" class="sr-only">Terminal input</label>
                <span class="input-prompt">guest@portfolio:~$</span>
                <input
                    type="text"
                    id="terminal-input"
                    spellcheck="false"
                    autocapitalize="off"
                    autocomplete="off"
                    aria-label="Terminal command input"
                >
                <span class="cursor" id="cursor" aria-hidden="true">█</span>
            </form>
        </div>
    `;
}
