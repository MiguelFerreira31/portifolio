/* ==========================================================================
   TERMINAL — efeito de digitação linha a linha
   ========================================================================== */

(function() {
    const lines = [{
        t: 'prompt',
        txt: 'whoami'
    }, {
        t: 'out',
        txt: 'miguel_ferreira <span class="t-val">// Full Stack Dev</span>'
    }, {
        t: 'prompt',
        txt: 'cat stack.json'
    }, {
        t: 'out',
        txt: '{'
    }, {
        t: 'out',
        txt: '&nbsp;&nbsp;<span class="t-key">"backend"</span>: <span class="t-str">["Java","Spring Boot","PHP","Node.js"]</span>,'
    }, {
        t: 'out',
        txt: '&nbsp;&nbsp;<span class="t-key">"frontend"</span>: <span class="t-str">["Angular","React","Next.js","TypeScript"]</span>,'
    }, {
        t: 'out',
        txt: '&nbsp;&nbsp;<span class="t-key">"database"</span>: <span class="t-str">["PostgreSQL","MySQL","Flyway"]</span>,'
    }, {
        t: 'out',
        txt: '&nbsp;&nbsp;<span class="t-key">"cloud"</span>: <span class="t-str">["AWS","Docker","Vercel","Supabase"]</span>,'
    }, {
        t: 'out',
        txt: '&nbsp;&nbsp;<span class="t-key">"status"</span>: <span class="t-val">"open_to_work"</span>'
    }, {
        t: 'out',
        txt: '}'
    }, {
        t: 'prompt',
        txt: 'java --version && mvn spring-boot:run'
    }, {
        t: 'out',
        txt: 'openjdk · Spring Boot 3'
    }, {
        t: 'out',
        txt: '<span class="t-val">Started</span> · API REST <span class="t-str">:8080</span> · JWT <span class="t-str">ON</span>'
    }, {
        t: 'prompt',
        txt: '<span class="t-cursor"></span>',
        cursor: true
    }];
    const body = document.getElementById('termBody');

    function renderLines() {
        body.innerHTML = '';
        lines.forEach((l, i) => {
            const span = document.createElement('span');
            span.className = 't-line';
            if (l.t === 'prompt') span.innerHTML = `<span class="t-prompt">miguel@dev</span><span style="color:var(--muted)">:</span><span style="color:var(--purple)">~</span><span style="color:var(--muted)">$</span> <span class="t-cmd">${l.txt}</span>`;
            else span.innerHTML = l.txt;
            body.appendChild(span);
        });
        const els = body.querySelectorAll('.t-line');
        gsap.to(els, {
            opacity: 1,
            duration: .01,
            stagger: .18,
            delay: .6,
            ease: 'none'
        });
    }

    window.Portfolio.renderTerminal = renderLines;
})();
