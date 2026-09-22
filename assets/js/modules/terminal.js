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
        txt: '&nbsp;&nbsp;<span class="t-key">"backend"</span>: <span class="t-str">["PHP","Node.js","Python","Java"]</span>,'
    }, {
        t: 'out',
        txt: '&nbsp;&nbsp;<span class="t-key">"frontend"</span>: <span class="t-str">["React","Next.js","Angular"]</span>,'
    }, {
        t: 'out',
        txt: '&nbsp;&nbsp;<span class="t-key">"ai_agents"</span>: <span class="t-str">["LangGraph","CrewAI","OpenAI SDK"]</span>,'
    }, {
        t: 'out',
        txt: '&nbsp;&nbsp;<span class="t-key">"cloud"</span>: <span class="t-str">["AWS","EC2","Lambda","S3"]</span>,'
    }, {
        t: 'out',
        txt: '&nbsp;&nbsp;<span class="t-key">"status"</span>: <span class="t-val">"open_to_work"</span>'
    }, {
        t: 'out',
        txt: '}'
    }, {
        t: 'prompt',
        txt: 'node --version && ping singlefuture.com.br'
    }, {
        t: 'out',
        txt: 'v20.11.0'
    }, {
        t: 'out',
        txt: '<span class="t-val">PONG</span> · latency <span class="t-str">12ms</span> · uptime <span class="t-str">99.9%</span>'
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
            if (l.t === 'prompt') span.innerHTML = `<span class="t-prompt">miguel@sf</span><span style="color:var(--muted)">:</span><span style="color:var(--purple)">~</span><span style="color:var(--muted)">$</span> <span class="t-cmd">${l.txt}</span>`;
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
