// === SCROLL RESTORATION ===
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('pageshow', () => {
    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }
});

// === PROGRESS BAR ===
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = progress + '%';
});

// === NAV SCROLL ===
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// === MOBILE NAV TOGGLE ===
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
    });
});

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// === TYPING ANIMATION ===
const typingTexts = [
    'backend dev & security researcher',
    'building tools that actually work',
    'php • node.js • python • go',
    'linux enthusiast & bug hunter'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function typeText() {
    const currentText = typingTexts[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typeSpeed = 500;
    }

    setTimeout(typeText, typeSpeed);
}

typeText();

// === RADAR ANIMATION ===
const radarWrapper = document.getElementById('radarWrapper');
if (radarWrapper) {
    setInterval(() => {
        const dot = document.createElement('div');
        dot.className = 'radar-dot';
        
        // Random position within a circle of radius 140px
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 140;
        
        const x = Math.cos(angle) * radius + 160; // Center is 160
        const y = Math.sin(angle) * radius + 160;
        
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        
        radarWrapper.appendChild(dot);
        
        // Remove after animation (2s)
        setTimeout(() => {
            dot.remove();
        }, 2000);
    }, 1000 + Math.random() * 1000); // Random interval between 1-2s
}

// === REVEAL ON SCROLL ===
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.work-card, .skill-card, .contact-card, .curr-item, .about-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// === TERMINAL ===
const termBody = document.getElementById('termBody');
const termInput = document.getElementById('termInput');
const cmdHistory = [];
let historyIndex = -1;

function addLine(text, isCommand = false) {
    const line = document.createElement('div');
    line.className = 'term-line';

    if (isCommand) {
        line.innerHTML = `<span class="t-dim">visitor@portfolio:~$ </span><span class="t-white">${text}</span>`;
    } else if (text !== null) {
        line.innerHTML = text;
    }

    termBody.appendChild(line);
    termBody.scrollTop = termBody.scrollHeight;
}

const commands = {
    help: () => `<span class="t-green">Available commands:</span>

  <span class="t-cyan">about</span>      - who is sundram?
  <span class="t-cyan">projects</span>   - list my projects
  <span class="t-cyan">skills</span>     - tech stack
  <span class="t-cyan">contact</span>    - reach me
  <span class="t-cyan">whoami</span>     - about you
  <span class="t-cyan">date</span>       - current time
  <span class="t-cyan">clear</span>      - clear terminal
  <span class="t-cyan">neofetch</span>   - system info
  <span class="t-cyan">hack</span>       - try it
  <span class="t-dim">or just type anything</span>`,

    about: () => `<span class="t-white">Sundram Yadav</span> — backend dev, security researcher.
PHP, Node.js, Python. I build tools that actually do stuff.

Network scanning, telegram bots, automation scripts.
Linux, bug bounty, and keeping things simple.`,

    projects: () => `<span class="t-green">Projects:</span>

  <span class="t-cyan">AdwanceSNI 2.0</span>    — <span class="t-yellow">Python</span>  network scanner (★ 22)
  <span class="t-cyan">Zyphron Dash</span>       — <span class="t-yellow">Vue+NestJS</span>  e-commerce dashboard
  <span class="t-cyan">TG Chat Fetch</span>      — <span class="t-yellow">Python</span>  telegram archiver
  <span class="t-cyan">AdwanceSNI</span>         — <span class="t-yellow">Python</span>  SNI finder (★ 10)
  <span class="t-cyan">FlashScan Go</span>       — <span class="t-yellow">Go</span>  security scanner
  <span class="t-cyan">Insta Downloader</span>   — <span class="t-yellow">Python</span>  telegram bot (★ 3)
  <span class="t-dim">github.com/SirYadav1</span>`,

    skills: () => `<span class="t-green">Tech Stack:</span>

  <span class="t-purple">Languages:</span>   PHP, Node.js, Python, TypeScript, Go, Bash
  <span class="t-purple">Frameworks:</span>   Express, Vue.js, NestJS, React, Flutter
  <span class="t-purple">Infra:</span>        Linux, Docker, Nginx, MySQL, Cloudflare
  <span class="t-purple">Security:</span>     Network Scanning, Bug Bounty, SNI Detection`,

    contact: () => `<span class="t-green">Reach me:</span>

  <span class="t-cyan">GitHub:</span>   github.com/SirYadav1
  <span class="t-cyan">Telegram:</span> t.me/SirYadav
  <span class="t-cyan">X:</span>         x.com/siryadav0
  <span class="t-cyan">LeetCode:</span>  leetcode.com/u/siryadav1
  <span class="t-cyan">Email:</span>     osamabinladenfromindia@gmail.com`,

    whoami: () => `<span class="t-green">visitor@portfolio</span> <span class="t-dim">(some dev looking around)</span>`,

    date: () => `<span class="t-cyan">${new Date().toString()}</span>`,

    clear: () => {
        termBody.innerHTML = '';
        return null;
    },

    neofetch: () => `<span class="t-cyan">       _____</span>           <span class="t-green">visitor</span>@<span class="t-green">portfolio</span>
<span class="t-cyan">      /     \\</span>          --------------------
<span class="t-cyan">     | () () |</span>         <span class="t-purple">OS:</span> Portfolio v2 (custom)
<span class="t-cyan">     |  ___  |</span>         <span class="t-purple">Host:</span> Sundram Yadav
<span class="t-cyan">     | |   | |</span>         <span class="t-purple">Kernel:</span> Vanilla JS
<span class="t-cyan">     |_|   |_|</span>         <span class="t-purple">Uptime:</span> 100% caffeine
<span class="t-cyan">   __|       |__</span>        <span class="t-purple">Shell:</span> portfolio terminal
<span class="t-cyan">  /  \\       /  \\</span>       <span class="t-purple">Theme:</span> dark/green
<span class="t-cyan"> / /\\ \\_____/ /\\ \\</span>      <span class="t-purple">Motto:</span> build. break. secure.
<span class="t-cyan"> \\_\\/         \\/_/</span>

<span class="t-dim">  status: still learning, still building</span>`,

    hack: () => [
        '<span class="t-red">⚠️ intrusion attempt detected</span>',
        '<span class="t-yellow">firewall bypass in progress...</span>',
        '<span class="t-yellow">decrypting handshake...</span>',
        '<span class="t-green">ACCESS GRANTED</span>',
        '<span class="t-cyan">just kidding. security researcher, remember? :)</span>'
    ].join('\n')
};

const easterEggs = {
    hello: '<span class="t-cyan">hey! welcome :)</span>',
    hi: '<span class="t-cyan">yo. what brings you here?</span>',
    'how are you': '<span class="t-green">doing great, you?</span>',
    sus: '<span class="t-yellow">ඞ sus</span>',
    password: '<span class="t-red">nice try ;)</span>',
    sudo: '<span class="t-yellow">you are not in the sudoers file.</span>',
    bye: '<span class="t-dim">cya. come back anytime.</span>',
    thanks: '<span class="t-green">no problem.</span>',
    '42': '<span class="t-green">the answer to life, the universe, and everything.</span>'
};

termInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        const value = termInput.value.trim();
        if (value) {
            cmdHistory.unshift(value);
            historyIndex = -1;
            addLine(value, true);

            const cmd = value.toLowerCase();
            if (commands[cmd]) {
                const result = commands[cmd]();
                if (result !== null) addLine(result);
            } else if (easterEggs[cmd]) {
                addLine(easterEggs[cmd]);
            } else {
                addLine(`<span class="t-red">command not found: ${value}</span>\n<span class="t-dim">type 'help'</span>`);
            }
        }
        termInput.value = '';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex < cmdHistory.length - 1) {
            historyIndex++;
            termInput.value = cmdHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            termInput.value = cmdHistory[historyIndex];
        } else {
            historyIndex = -1;
            termInput.value = '';
        }
    }
});

// Focus terminal on click
document.querySelector('.terminal').addEventListener('click', () => {
    termInput.focus();
});

// Auto-focus terminal when visible
const terminalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => termInput.focus(), 500);
        }
    });
}, { threshold: 0.5 });

terminalObserver.observe(document.querySelector('.terminal'));

/* === METEORS (ported from sv-animations) === */
(function initMeteors() {
    const container = document.getElementById('meteors');
    if (!container) return;
    const count = 20;
    const angle = 215;
    const minDelay = 0.2, maxDelay = 1.2;
    const minDur = 2, maxDur = 10;
    for (let i = 0; i < count; i++) {
        const m = document.createElement('span');
        m.className = 'meteor';
        m.style.setProperty('--meteor-angle', `-${angle}deg`);
        m.style.left = `calc(0% + ${Math.floor(Math.random() * window.innerWidth)}px)`;
        m.style.setProperty('--meteor-delay', `${(Math.random() * (maxDelay - minDelay) + minDelay).toFixed(2)}s`);
        m.style.setProperty('--meteor-duration', `${Math.floor(Math.random() * (maxDur - minDur) + minDur)}s`);
        container.appendChild(m);
    }
})();

/* === NUMBER TICKER + LIVE GITHUB DATA === */
(function initNumberTicker() {
    const USERNAME = 'SirYadav1';
    const nums = document.querySelectorAll('.stat-num[data-count]');
    if (!nums.length) return;

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const animate = (el, target) => {
        const suffix = el.textContent.replace(/[0-9]/g, '').trim();
        const duration = 2000;
        const start = performance.now();
        const step = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const val = Math.floor(easeOut(p) * target);
            el.textContent = val + suffix;
            if (p < 1) requestAnimationFrame(step);
            else el.textContent = target + suffix;
        };
        requestAnimationFrame(step);
    };

    // Fetch real GitHub stats, then animate each counter with live values
    async function loadGitHubStats() {
        try {
            const [userRes, reposRes] = await Promise.all([
                fetch(`https://api.github.com/users/${USERNAME}`),
                fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`)
            ]);
            if (!userRes.ok || !reposRes.ok) return;
            const user = await userRes.json();
            const repos = await reposRes.json();
            if (!Array.isArray(repos)) return;

            const stars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
            const langs = new Set(repos.map(r => r.language).filter(Boolean));

            const values = {
                repos: user.public_repos ?? repos.length,
                stars: stars,
                followers: user.followers ?? 0,
                languages: langs.size
            };

            nums.forEach((el) => {
                const key = el.getAttribute('data-api');
                const live = values[key];
                if (typeof live === 'number') {
                    el.setAttribute('data-count', live);
                    animate(el, live);
                }
            });
        } catch (e) {
            // Keep fallback hardcoded values if API fails/rate-limited
            nums.forEach((el) => animate(el, parseFloat(el.getAttribute('data-count')) || 0));
        }
    }

    // Animate with fallback values immediately (in view), then refresh with live data
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                const el = e.target;
                const fallback = parseFloat(el.getAttribute('data-count')) || 0;
                animate(el, fallback);
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    nums.forEach((n) => obs.observe(n));

    // Fetch live data (does not depend on scroll)
    loadGitHubStats();
})();

/* === PARTICLES (sv-particles inspired, vanilla) === */
(function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const count = 35;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('span');
        p.className = 'particle';
        const size = Math.random() * 3 + 1;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.setProperty('--p-dur', (Math.random() * 6 + 6).toFixed(1) + 's');
        p.style.setProperty('--p-delay', (Math.random() * 4).toFixed(1) + 's');
        container.appendChild(p);
    }
})();

/* === SCROLL REVEAL (sv-animations fade-in style) === */
(function initReveal() {
    const targets = document.querySelectorAll(
        '.section-header, .about-text, .about-card, .currently-section, .work-card, .skill-card, .contact-card, .curr-item, .terminal, .hero-stats'
    );
    if (!targets.length) return;
    targets.forEach((t) => t.classList.add('reveal'));
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add('is-visible');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });
    targets.forEach((t) => obs.observe(t));
})();