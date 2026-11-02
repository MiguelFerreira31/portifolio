/* ==========================================================================
   WHATSAPP — entrada, hover e pulso do botão flutuante
   ========================================================================== */

(function() {
    const wrap = document.getElementById('waBtnWrap');
    if (!wrap) return;
    const btn = wrap.querySelector('.wa-btn');
    if (!window.Portfolio.canAnimate) return;
    /* entrada após o preloader: disparada pelo evento do hero */
    window.addEventListener('portfolio:hero', () => gsap.fromTo(wrap, {
        opacity: 0,
        y: 24,
        scale: .75
    }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: .9,
        ease: 'back.out(1.6)',
        onComplete: () => gsap.to(wrap, {
            y: '-=9',
            duration: 3.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
        })
    }), { once: true });
    /* hover scale */
    wrap.addEventListener('mouseenter', () => gsap.to(btn, {
        scale: 1.1,
        duration: .28,
        ease: 'back.out(1.5)'
    }));
    wrap.addEventListener('mouseleave', () => gsap.to(btn, {
        scale: 1,
        duration: .28,
        ease: 'power2.out'
    }));
})();
