/* ==========================================================================
   PROJECTS FILTER — filtro por categoria com transição GSAP
   Os botões declaram a categoria em data-filter e os cards em data-cat.
   ========================================================================== */

(function() {
    const buttons = document.querySelectorAll('.f-btn'),
        cards = document.querySelectorAll('.proj-card');

    function filter(cat, btn) {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        cards.forEach(c => {
            const match = cat === 'all' || c.dataset.cat === cat;
            if (match) {
                c.style.display = '';
                if (window.gsap) gsap.fromTo(c, {
                    opacity: 0,
                    scale: .95
                }, {
                    opacity: 1,
                    scale: 1,
                    duration: .38,
                    ease: 'power2.out'
                })
            } else if (!window.gsap) c.style.display = 'none';
            else gsap.to(c, {
                opacity: 0,
                scale: .95,
                duration: .22,
                ease: 'power2.in',
                onComplete: () => {
                    c.style.display = 'none'
                }
            });
        });
    }

    buttons.forEach(btn => btn.addEventListener('click', () => filter(btn.dataset.filter, btn)));
})();
