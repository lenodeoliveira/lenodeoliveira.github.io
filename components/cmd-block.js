export function cmdBlock({ id, command, output }) {
    return `
        <section class="cmd-block" id="${id}">
            <p class="cmd-prompt">
                <span class="prompt">&gt;</span>
                <span class="cmd-name">${command}</span>
            </p>
            ${output}
        </section>
    `;
}
