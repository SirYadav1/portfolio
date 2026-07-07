// === INITIAL SCROLL POSITION ===
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('pageshow', () => {
    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }
});

// === SCROLL PROGRESS ===
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const t = document.documentElement.scrollTop;
    const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollProgress) {
        scrollProgress.style.width = (t / h) * 100 + '%';
    }
});

// === NAVBAR ===
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.style.background = window.scrollY > 50 ? 'rgba(9,9,11,.85)' : 'rgba(9,9,11,.6)';
});

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute('href'));
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// === SCROLL ANIMATIONS ===
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.project-card, .about-card, .skill-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    observer.observe(el);
});

// === TYPING EFFECT ===
const subtitle = document.querySelector('.hero-subtitle');
const texts = ['Developer & Security Researcher', 'Python \u2022 Go \u2022 JavaScript', 'Building Tools That Matter'];
let ti = 0, ci = 0, del = false;
function type() {
    const cur = texts[ti];
    subtitle.textContent = del ? cur.substring(0, ci - 1) : cur.substring(0, ci + 1);
    ci += del ? -1 : 1;
    let spd = del ? 40 : 80;
    if (!del && ci === cur.length) { spd = 2000; del = true; }
    else if (del && ci === 0) { del = false; ti = (ti + 1) % texts.length; spd = 400; }
    setTimeout(type, spd);
}
setTimeout(type, 800);

// === STAT COUNTERS ===
const statsObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-num').forEach(s => {
                const target = parseInt(s.dataset.target);
                let cur = 0;
                const inc = target / 50;
                const timer = setInterval(() => {
                    cur += inc;
                    if (cur >= target) { s.textContent = target + '+'; clearInterval(timer); }
                    else s.textContent = Math.floor(cur) + '+';
                }, 30);
            });
            statsObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObs.observe(heroStats);

// === TERMINAL ===
const termBody = document.getElementById('terminalBody');
const termInput = document.getElementById('terminalInput');
const hist = [];
let hi = -1;

const cmds = {
    help: () => `<span class="t-green">Available commands:</span>

  <span class="t-cyan">about</span>      - Learn about Sundram
  <span class="t-cyan">projects</span>   - List all projects
  <span class="t-cyan">skills</span>     - Show technical skills
  <span class="t-cyan">contact</span>    - Get contact info
  <span class="t-cyan">whoami</span>     - Who are you?
  <span class="t-cyan">date</span>       - Current date & time
  <span class="t-cyan">github</span>     - Open GitHub profile
  <span class="t-cyan">telegram</span>   - Open Telegram
  <span class="t-cyan">neofetch</span>   - System info
  <span class="t-cyan">hack</span>       - Try to hack the terminal
  <span class="t-cyan">clear</span>      - Clear terminal
  <span class="t-dim">Type anything else for a surprise!</span>`,

    about: () => `<span class="t-white">Sundram Yadav</span> is a developer and security researcher.
He builds tools that automate, secure, and optimize.

<span class="t-dim">From network scanners to Telegram bots,</span>
<span class="t-dim">he turns ideas into functional software.</span>`,

    projects: () => `<span class="t-green">Featured Projects:</span>

  <span class="t-cyan">1.</span> AdwanceSNI 2.0    <span class="t-yellow">Python</span>    <span class="t-dim">Network Scanner</span>
  <span class="t-cyan">2.</span> Zyphron Free Dash  <span class="t-yellow">Vue+JS</span>    <span class="t-dim">E-commerce Dashboard</span>
  <span class="t-cyan">3.</span> Minecraft AFK Bot  <span class="t-yellow">Node.js</span>  <span class="t-dim">Game Automation</span>
  <span class="t-cyan">4.</span> TG Chat Fetch      <span class="t-yellow">Python</span>    <span class="t-dim">Telegram Archiver</span>
  <span class="t-cyan">5.</span> AdwanceSNI         <span class="t-yellow">Python</span>    <span class="t-dim">SNI Finder</span>
  <span class="t-cyan">6.</span> FlashScan Go       <span class="t-yellow">Go</span>        <span class="t-dim">Security Scanner</span>
  <span class="t-cyan">7.</span> Insta Downloader   <span class="t-yellow">Python</span>    <span class="t-dim">Telegram Bot</span>`,

    skills: () => `<span class="t-green">Technical Skills:</span>

  <span class="t-purple">Languages:</span>  Python, JavaScript, TypeScript, Go, Shell
  <span class="t-purple">Frameworks:</span> Vue.js, NestJS, Node.js, Telethon, Vite
  <span class="t-purple">Tools:</span>      Git, Docker, Linux, Nginx, PostgreSQL
  <span class="t-purple">Security:</span>   Network Scanning, Bug Bounty, SNI Detection`,

    contact: () => `<span class="t-green">Contact Info:</span>

  <span class="t-cyan">GitHub:</span>   github.com/SirYadav1
  <span class="t-cyan">Telegram:</span> t.me/SirYadav1
  <span class="t-cyan">Email:</span>    contact@sundram.dev`,

    whoami: () => `<span class="t-green">visitor@portfolio</span> <span class="t-dim">(a curious developer exploring the matrix)</span>`,
    date: () => `<span class="t-cyan">${new Date().toString()}</span>`,
    github: () => { window.open('https://github.com/SirYadav1', '_blank'); return '<span class="t-green">Opening GitHub profile...</span>'; },
    telegram: () => { window.open('https://t.me/SirYadav1', '_blank'); return '<span class="t-green">Opening Telegram...</span>'; },

    neofetch: () => `<span class="t-cyan">       _____</span>           <span class="t-green">visitor</span>@<span class="t-green">portfolio</span>
<span class="t-cyan">      /     \\</span>          ----------------
<span class="t-cyan">     | () () |</span>         <span class="t-purple">OS:</span> Portfolio OS v2.0
<span class="t-cyan">     |  ___  |</span>         <span class="t-purple">Host:</span> Sundram Yadav
<span class="t-cyan">     | |   | |</span>         <span class="t-purple">Kernel:</span> JavaScript ES2024
<span class="t-cyan">     |_|   |_|</span>         <span class="t-purple">Shell:</span> Portfolio Terminal
<span class="t-cyan">   __|       |__</span>        <span class="t-purple">DE:</span> Custom HTML/CSS
<span class="t-cyan">  /  \\       /  \\</span>       <span class="t-purple">Theme:</span> Dark [Purple]
<span class="t-cyan"> / /\\ \\_____/ /\\ \\</span>      <span class="t-purple">CPU:</span> Imagination @ 100%
<span class="t-cyan"> \\_\\/         \\/_/</span>      <span class="t-purple">Memory:</span> Unlimited Curiosity

<span class="t-dim">       Built with passion</span>`,

    hack: () => [
        '<span class="t-red">WARNING: Unauthorized access attempt detected!</span>',
        '<span class="t-yellow">Bypassing firewall...</span>',
        '<span class="t-yellow">Decrypting password hashes...</span>',
        '<span class="t-yellow">Accessing mainframe...</span>',
        '<span class="t-green">ACCESS GRANTED!</span>',
        '<span class="t-cyan">Just kidding! This is a portfolio terminal :)</span>',
        '<span class="t-dim">Sundram\'s security skills are real though.</span>'
    ].join('\n'),

    clear: () => { termBody.innerHTML = ''; return null; }
};

const eggs = {
    hello: '<span class="t-cyan">Hello there! Nice to meet you :)</span>',
    hi: '<span class="t-cyan">Hey! What brings you here?</span>',
    'how are you': '<span class="t-green">I\'m doing great, thanks for asking!</span>',
    sus: '<span class="t-yellow">SUS?ඞ</span>',
    amongus: '<span class="t-red">EMERGENCY MEETING!</span>',
    '42': '<span class="t-green">The answer to life, the universe, and everything.</span>',
    password: '<span class="t-red">Nice try! But I\'m a security researcher remember? ;)</span>',
    sudo: '<span class="t-yellow">Nice try, but you\'re not root here!</span>',
    'rm -rf': '<span class="t-red">DECLINED. This is why we can\'t have nice things.</span>',
    matrix: '<span class="t-green">Follow the white rabbit...</span>',
    bye: '<span class="t-dim">Goodbye! Come back soon!</span>',
    thanks: '<span class="t-green">You\'re welcome! Happy to help.</span>'
};

function addOut(text, isCmd = false) {
    const d = document.createElement('div');
    d.className = 'term-line';
    if (isCmd) d.innerHTML = '<span class="t-dim">visitor@portfolio:~$ </span><span class="t-white">' + text + '</span>';
    else if (text !== null) d.innerHTML = text;
    termBody.appendChild(d);
    termBody.scrollTop = termBody.scrollHeight;
}

termInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        const v = termInput.value.trim();
        if (v) {
            hist.unshift(v); hi = -1;
            addOut(v, true);
            const c = v.toLowerCase();
            if (cmds[c]) { const r = cmds[c](); if (r !== null) addOut(r); }
            else if (eggs[c]) addOut(eggs[c]);
            else addOut(`<span class="t-red">Command not found: ${v}</span>\n<span class="t-dim">Type 'help' for available commands.</span>`);
        }
        termInput.value = '';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (hi < hist.length - 1) { hi++; termInput.value = hist[hi]; }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (hi > 0) { hi--; termInput.value = hist[hi]; }
        else { hi = -1; termInput.value = ''; }
    }
});

document.querySelector('.terminal').addEventListener('click', () => termInput.focus());

// === KONAMI CODE ===
let kc = [];
const ks = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
document.addEventListener('keydown', e => {
    kc.push(e.key);
    if (kc.length > 10) kc.shift();
    if (JSON.stringify(kc) === JSON.stringify(ks)) {
        document.body.style.transition = 'transform 1s';
        document.body.style.transform = 'rotate(360deg)';
        setTimeout(() => { document.body.style.transform = ''; }, 1000);
        kc = [];
    }
});
