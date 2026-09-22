/* ==========================================================================
   PRELOADER — progresso simulado, glitch do nome e saída com GSAP
   ========================================================================== */

(function() {
    const PL = document.getElementById('preloader');
    const plName = document.getElementById('plName');
    const plFill = document.getElementById('plFill');
    const plPct = document.getElementById('plPct');
    'MIGUEL FERREIRA'.split('').forEach(ch => {
        const s = document.createElement('span');
        if (ch === ' ') {
            s.className = 'pl-char pl-space';
        } else {
            s.className = 'pl-char';
            s.textContent = ch;
        }
        plName.appendChild(s);
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
        pct = Math.min(pct + Math.random() * 5 + 1.5, 100);
        plFill.style.width = pct + '%';
        plPct.textContent = Math.round(pct) + '%';
        if (pct < 100) setTimeout(step, 38 + Math.random() * 42);
        else setTimeout(exit, 380);
    }
    setTimeout(step, 650);

    function exit() {
        gsap.timeline({
                onComplete: () => {
                    PL.style.display = 'none';
                    document.body.style.overflowY = '';
                    window.Portfolio.startHero();
                }
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

