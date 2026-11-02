/* ==========================================================================
   COUNTERS — contadores numéricos animados das estatísticas
   ========================================================================== */

(function() {
    if (!window.Portfolio.canAnimate) return;
    let ran = false;
    ScrollTrigger.create({
        trigger: '.hero-stats',
        start: 'top 85%',
        onEnter: () => {
            if (ran) return;
            ran = true;
            document.querySelectorAll('[data-target]').forEach((el, i) => {
                const t = +el.dataset.target;
                /* o valor final já está no HTML: a contagem parte de 1 e nunca mostra o glifo "0" */
                el.classList.add('counting');
                gsap.to({
                    v: 1
                }, {
                    v: t,
                    duration: 1.8,
                    delay: i * .12,
                    ease: 'power2.out',
                    onUpdate: function() {
                        el.textContent = Math.round(this.targets()[0].v) + (el.dataset.suffix || '')
                    },
                    onComplete: () => {
                        el.textContent = t + (el.dataset.suffix || '');
                        el.classList.remove('counting')
                    }
                });
            });
        }
    });
})();
