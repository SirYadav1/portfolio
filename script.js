// === INITIAL SCROLL POSITION ===
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('pageshow', () => {
    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }
});

// === NAV SCROLL ===
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 40
    ? 'rgba(10, 10, 11, 0.85)'
    : 'rgba(10, 10, 11, 0.7)';
});

// === SCROLL PROGRESS ===
const bar = document.createElement('div');
bar.style.cssText = 'position:fixed;top:0;left:0;height:1.5px;background:#22c55e;z-index:200;transition:width .15s;width:0';
document.body.prepend(bar);
window.addEventListener('scroll', () => {
  const t = document.documentElement.scrollTop;
  const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  bar.style.width = (t / h) * 100 + '%';
});

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// === REVEAL ON SCROLL ===
const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.work-card, .sc, .cc').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  obs.observe(el);
});

// === TERMINAL ===
const termBody = document.getElementById('termBody');
const termInput = document.getElementById('termInput');
const hist = [];
let hi = -1;

function addLine(text, isCmd = false) {
  const d = document.createElement('div');
  d.className = 'tl';
  if (isCmd) d.innerHTML = '<span class="c-dim">visitor@portfolio:~$ </span><span class="c-white">' + text + '</span>';
  else if (text !== null) d.innerHTML = text;
  termBody.appendChild(d);
  termBody.scrollTop = termBody.scrollHeight;
}

const cmds = {
  help: () => `<span class="c-green">Available commands:</span>

  <span class="c-cyan">about</span>      - who is sundram?
  <span class="c-cyan">projects</span>   - list my projects
  <span class="c-cyan">skills</span>     - tech stack
  <span class="c-cyan">contact</span>    - reach me
  <span class="c-cyan">whoami</span>     - about you
  <span class="c-cyan">date</span>       - current time
  <span class="c-cyan">clear</span>      - clear terminal
  <span class="c-cyan">neofetch</span>   - system info
  <span class="c-cyan">hack</span>       - try it
  <span class="c-dim">or just type anything</span>`,

  about: () => `<span class="c-white">Sundram Yadav</span> — backend developer and security researcher.
PHP, Node.js, Python. I build tools that automate, scan, and protect.

Currently exploring network security and writing open-source tools.
Linux user who believes in clean, functional code.`,

  projects: () => `<span class="c-green">Projects:</span>

  <span class="c-cyan">AdwanceSNI 2.0</span>    — <span class="c-yellow">Python</span>  network scanner (★ 22)
  <span class="c-cyan">Zyphron Dash</span>       — <span class="c-yellow">Vue+NestJS</span>  e-commerce dashboard
  <span class="c-cyan">Minecraft AFK Bot</span>  — <span class="c-yellow">Node.js</span>  game automation
  <span class="c-cyan">TG Chat Fetch</span>      — <span class="c-yellow">Python</span>  telegram archiver
  <span class="c-cyan">AdwanceSNI</span>         — <span class="c-yellow">Python</span>  SNI finder (★ 10)
  <span class="c-cyan">FlashScan Go</span>       — <span class="c-yellow">Go</span>  security scanner
  <span class="c-cyan">Insta Downloader</span>   — <span class="c-yellow">Python</span>  telegram bot (★ 3)
  <span class="c-dim">github.com/SirYadav1</span>`,

  skills: () => `<span class="c-green">Tech Stack:</span>

  <span class="c-purple">Languages:</span>   PHP, Node.js, Python, TypeScript, Go, Bash
  <span class="c-purple">Frameworks:</span>   Express, Vue.js, NestJS, React, Flutter
  <span class="c-purple">Infra:</span>        Linux, Docker, Nginx, MySQL, Cloudflare
  <span class="c-purple">Security:</span>     Network Scanning, Bug Bounty, SNI Detection`,

  contact: () => `<span class="c-green">Reach me:</span>

  <span class="c-cyan">GitHub:</span>   github.com/SirYadav1
  <span class="c-cyan">Telegram:</span> t.me/SirYadav
  <span class="c-cyan">X:</span>         x.com/siryadav0
  <span class="c-cyan">LeetCode:</span>  leetcode.com/u/siryadav1
  <span class="c-cyan">Email:</span>     osamabinladenfromindia@gmail.com`,

  whoami: () => `<span class="c-green">visitor@portfolio</span> <span class="c-dim">(some dev looking around)</span>`,

  date: () => `<span class="c-cyan">${new Date().toString()}</span>`,

  clear: () => { termBody.innerHTML = ''; return null; },

  neofetch: () => `<span class="c-cyan">       _____</span>           <span class="c-green">visitor</span>@<span class="c-green">portfolio</span>
<span class="c-cyan">      /     \\</span>          --------------------
<span class="c-cyan">     | () () |</span>         <span class="c-purple">OS:</span> Portfolio v2 (custom)
<span class="c-cyan">     |  ___  |</span>         <span class="c-purple">Host:</span> Sundram Yadav
<span class="c-cyan">     | |   | |</span>         <span class="c-purple">Kernel:</span> Vanilla JS
<span class="c-cyan">     |_|   |_|</span>         <span class="c-purple">Uptime:</span> 100% caffeine
<span class="c-cyan">   __|       |__</span>        <span class="c-purple">Shell:</span> portfolio terminal
<span class="c-cyan">  /  \\       /  \\</span>       <span class="c-purple">Theme:</span> dark/green
<span class="c-cyan"> / /\\ \\_____/ /\\ \\</span>      <span class="c-purple">Motto:</span> build. break. secure.
<span class="c-cyan"> \\_\\/         \\/_/</span>

<span class="c-dim">  built from scratch, no templates</span>`,

  hack: () => [
    '<span class="c-red">⚠️ intrusion attempt detected</span>',
    '<span class="c-yellow">firewall bypass in progress...</span>',
    '<span class="c-yellow">decrypting handshake...</span>',
    '<span class="c-green">ACCESS GRANTED</span>',
    '<span class="c-cyan">just kidding. security researcher, remember? :)</span>'
  ].join('\n')
};

const eggs = {
  hello: '<span class="c-cyan">hey! welcome :)</span>',
  hi: '<span class="c-cyan">yo. what brings you here?</span>',
  'how are you': '<span class="c-green">doing great, you?</span>',
  sus: '<span class="c-yellow">ඞ sus</span>',
  password: '<span class="c-red">nice try ;)</span>',
  sudo: '<span class="c-yellow">you are not in the sudoers file.</span>',
  bye: '<span class="c-dim">cya. come back anytime.</span>',
  thanks: '<span class="c-green">no problem.</span>',
  '42': '<span class="c-green">the answer to life, the universe, and everything.</span>'
};

termInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const v = termInput.value.trim();
    if (v) {
      hist.unshift(v);
      hi = -1;
      addLine(v, true);
      const c = v.toLowerCase();
      if (cmds[c]) { const r = cmds[c](); if (r !== null) addLine(r); }
      else if (eggs[c]) addLine(eggs[c]);
      else addLine(`<span class="c-red">command not found: ${v}</span>\n<span class="c-dim">type 'help'</span>`);
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
