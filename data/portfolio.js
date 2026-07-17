export const portfolio = {
    meta: {
        title: 'john@portfolio ~ whoami',
        description: 'John Lennon — Software Engineer. Cloud Architecture, AWS, Distributed Systems.',
    },

    nav: [
        { href: '#whoami', cmd: 'whoami', label: 'whoami' },
        { href: '#focus', cmd: 'current_focus', label: 'focus' },
        { href: '#experience', cmd: 'experience', label: 'experience' },
        { href: '#technologies', cmd: 'technologies', label: 'tech' },
        { href: '#projects', cmd: 'projects', label: 'projects' },
        { href: '#certifications', cmd: 'certifications', label: 'certs' },
        { href: '#contact', cmd: 'contact', label: 'contact' },
    ],

    terminal: {
        windowTitle: 'john@portfolio: ~/dev',
        status: '● online',
        bootText: 'Initializing portfolio shell... [OK]',
        inputPrompt: 'guest@portfolio:~$',
    },

    whoami: {
        name: 'John Lennon',
        role: 'Software Engineer',
        tagline: 'Building scalable systems in the cloud.',
    },

    focus: [
        'Cloud Architecture',
        'AWS',
        'Distributed Systems',
        'AI Engineering',
    ],

    experience: '6+ years building software.',

    technologies: [
        'TypeScript',
        'NestJS',
        'AWS',
        'MySQL',
        'Docker',
        'Microservices',
    ],

    projects: [
        {
            name: 'Corvo-Zap',
            url: 'https://github.com/lenodeoliveira/corvo-zap',
            description: '// crow messenger app — send corvos to chat with friends',
        },
        {
            name: 'NestJS Logs',
            description: '// structured logging toolkit',
        },
        {
            name: 'CMS',
            url: 'https://github.com/lenodeoliveira/my_cms_blog',
            description: '// content management system with Docker',
        },
    ],

    certifications: [
        {
            badge: 'AWS',
            name: 'Solutions Architect Associate',
            status: 'in progress',
        },
    ],

    contact: [
        {
            label: 'GitHub',
            url: 'https://github.com/lenodeoliveira',
            external: true,
        },
        {
            label: 'LinkedIn',
            url: 'https://www.linkedin.com/in/johnlennondeoliveira/',
            external: true,
        },
        {
            label: 'Email',
            url: 'mailto:lenodeoliveira@gmail.com',
        },
    ],

    footer: {
        name: 'John Lennon',
    },
};
