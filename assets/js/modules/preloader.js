/* ==========================================================================
   PRELOADER — nome completo + progresso, curto (~0,8 s), só na 1ª visita da sessão
   ========================================================================== */

(function() {
    const PL = document.getElementById('preloader');
    const root = document.documentElement;
    let done = false;

    function finish() {
        if (done) return;
        done = true;
        PL.style.display = 'none';
        document.body.style.overflowY = '';
        window.Portfolio.startHero();
    }
    /* sem animação, sem GSAP ou já visto nesta sessão: entra direto */
    if (!window.Portfolio.canAnimate || root.classList.contains('no-pl')) {
        PL.style.display = 'none';
        window.addEventListener('DOMContentLoaded', () => window.Portfolio.startHero());
        return;
    }
    try { sessionStorage.setItem('plSeen', '1'); } catch (e) {}
    document.body.style.overflowY = 'hidden';
    /* failsafe: o scroll e a página nunca ficam presos */
    setTimeout(finish, 2500);

    const plName = document.getElementById('plName');
    const plFill = document.getElementById('plFill');
    const plPct = document.getElementById('plPct');
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
    gsap.to('.pl-corner', { opacity: 1, duration: .25, stagger: .03 });
    gsap.to('.pl-label', { opacity: 1, duration: .3 });
    gsap.to('.pl-title', { opacity: 1, duration: .3, delay: .25 });
    gsap.to('.pl-char', { opacity: 1, y: 0, duration: .25, stagger: .008, ease: 'power3.out' });
    const prog = { v: 0 };
    gsap.to(prog, {
        v: 100,
        duration: .55,
        ease: 'power1.inOut',
        onUpdate: () => {
            plFill.style.width = prog.v + '%';
            plPct.textContent = Math.round(prog.v) + '%';
        },
        onComplete: exit
    });

    function exit() {
        gsap.timeline({ onComplete: finish })
            .to('.pl-char', { y: -60, opacity: 0, duration: .15, stagger: .005, ease: 'power3.in' }, 0)
            .to(['.pl-title', '.pl-label', '.pl-pct', '.pl-corner'], { opacity: 0, duration: .15 }, 0)
            .to(PL, { clipPath: 'inset(0 0 100% 0)', duration: .25, ease: 'power4.inOut' }, 0);
    }
})();
