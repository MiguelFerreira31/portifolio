/* ==========================================================================
   WHATSAPP — entrada, hover e pulso do botão flutuante
   ========================================================================== */

(function() {
    const wrap = document.getElementById('waBtnWrap');
    if (!wrap) return;
    const btn = wrap.querySelector('.wa-btn');
    /* entrada após preloader */
    gsap.fromTo(wrap, {
        opacity: 0,
        y: 24,
        scale: .75
    }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: .9,
        delay: 2.8,
        ease: 'back.out(1.6)',
        onComplete: () => gsap.to(wrap, {
            y: '-=9',
            duration: 3.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
        })
    });
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
