/* ==========================================================================
   PRELOADER — progresso simulado, glitch do nome e saída com GSAP
   ========================================================================== */

(function() {
    const PL = document.getElementById('preloader');
    const plName = document.getElementById('plName');
    const plFill = document.getElementById('plFill');
    const plPct = document.getElementById('plPct');
    let done = false;

    function finish() {
        PL.style.display = 'none';
        document.body.style.overflowY = '';
        window.Portfolio.startHero();
    }
    /* sem animação (movimento reduzido ou GSAP indisponível): entra direto */
    if (document.documentElement.classList.contains('no-anim')) {
        done = true;
        document.addEventListener('DOMContentLoaded', finish);
        return;
    }
    /* cada palavra é um bloco sem quebra, para o nome só quebrar entre palavras */
    'MIGUEL CEZAR FERREIRA'.split(' ').forEach((word, i) => {
        if (i) {
            const sp = document.createElement('span');
            sp.className = 'pl-char pl-space';
            plName.appendChild(sp);
        }
        const w = document.createElement('span');
        w.className = 'pl-word';
        word.split('').forEach(ch => {
            const s = document.createElement('span');
            s.className = 'pl-char';
            s.textContent = ch;
            w.appendChild(s);
        });
        plName.appendChild(w);
    });
    gsap.to('.pl-corner', {
        opacity: 1,
        duration: .5,
        stagger: .08,
        delay: .15
    });
    gsap.to('.pl-label', {
        opacity: 1,
        duration: .6,
        delay: .25
    });
    gsap.to('.pl-char', {
        opacity: 1,
        y: 0,
        duration: .55,
        stagger: .055,
        ease: 'power3.out',
        delay: .35
    });
    gsap.to('.pl-title', {
        opacity: 1,
        duration: .5,
        delay: 1.45
    });
    let pct = 0;

    function step() {
        if (done) return;
        pct = Math.min(pct + Math.random() * 4 + 2, 100);
        plFill.style.width = pct + '%';
        plPct.textContent = Math.round(pct) + '%';
        if (pct < 100) setTimeout(step, 45 + Math.random() * 40);
        else setTimeout(exit, 380);
    }
    setTimeout(step, 450);

    function exit() {
        if (done) return;
        done = true;
        gsap.timeline({
                onComplete: finish
            })
            .to('.pl-char', {
                y: -80,
                opacity: 0,
                duration: .4,
                stagger: .025,
                ease: 'power3.in'
            }, 0)
            .to(['.pl-title', '.pl-label', '.pl-pct'], {
                opacity: 0,
                duration: .28
            }, 0)
            .to('.pl-corner', {
                opacity: 0,
                duration: .28,
                stagger: .05
            }, 0)
            .to(PL, {
                clipPath: 'inset(0 0 100% 0)',
                duration: .6,
                ease: 'power4.inOut'
            }, .22);
    }
})();

