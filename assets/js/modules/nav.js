/* ==========================================================================
   NAV — estado no scroll, menu mobile e navegação suave entre seções
   ========================================================================== */

(function() {
    const nav = document.getElementById('nav'),
        mobileMenu = document.getElementById('mobileMenu'),
        hamburger = document.getElementById('hbg');

    /* Estado "scrolled" da navbar */
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 60));

    /* ── Menu mobile ── */
    function setMenu(open) {
        mobileMenu.classList.toggle('open', open);
        hamburger.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
        hamburger.setAttribute('aria-expanded', open);
        hamburger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
        mobileMenu.inert = !open;
    }
    mobileMenu.inert = true;
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) setMenu(false);
    });

    hamburger.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('open')));
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

    /* ── Scroll suave em todas as âncoras internas ── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const t = document.querySelector(a.getAttribute('href'));
            if (!t || !window.gsap) return;
            e.preventDefault();
            history.pushState(null, '', a.getAttribute('href'));
            gsap.to(window, {
                duration: document.documentElement.classList.contains('no-anim') ? 0 : 1,
                scrollTo: {
                    y: t,
                    offsetY: 66
                },
                ease: 'power3.inOut'
            });
        });
    });
})();
