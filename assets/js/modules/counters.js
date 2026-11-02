/* ==========================================================================
   COUNTERS — contadores numéricos animados das estatísticas
   ========================================================================== */

(function() {
    let ran = false;
    /* o HTML já traz o valor final (para robôs sem JS); aqui o contador volta a 0 antes de animar */
    document.querySelectorAll('[data-target]').forEach(el => {
        el.textContent = '0' + (el.dataset.suffix || '');
    });
    ScrollTrigger.create({
        trigger: '.hero-stats',
        start: 'top 85%',
        onEnter: () => {
            if (ran) return;
            ran = true;
            document.querySelectorAll('[data-target]').forEach((el, i) => {
                const t = +el.dataset.target;
                el.classList.add('counting');
                gsap.to({
                    v: 0
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
