/* ==========================================================================
   HERO ANIMATIONS — timeline de entrada, parallax e float da moldura da foto
   ========================================================================== */

(function() {
    function startHero() {
        window.Portfolio.renderTerminal();
        gsap.timeline()
            .to('.hero-badge', {
                opacity: 1,
                y: 0,
                duration: .7,
                ease: 'power3.out'
            })
            .fromTo('.hero-name', {
                opacity: 0,
                y: 36
            }, {
                opacity: 1,
                y: 0,
                duration: .9,
                ease: 'power3.out'
            }, .28)
            .fromTo('.hero-role', {
                opacity: 0,
                y: 20
            }, {
                opacity: 1,
                y: 0,
                duration: .7,
                ease: 'power3.out'
            }, .72)
            .fromTo('.hero-desc', {
                opacity: 0,
                y: 20
            }, {
                opacity: 1,
                y: 0,
                duration: .7,
                ease: 'power3.out'
            }, .92)
            .fromTo('.hero-btns', {
                opacity: 0,
                y: 20
            }, {
                opacity: 1,
                y: 0,
                duration: .7,
                ease: 'power3.out'
            }, 1.12)
            .fromTo('.hero-stats', {
                opacity: 0,
                y: 16
            }, {
                opacity: 1,
                y: 0,
                duration: .7,
                ease: 'power3.out'
            }, 1.32)
            .fromTo('#photoFrame', {
                opacity: 0,
                scale: .92,
                x: 30
            }, {
                opacity: 1,
                scale: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out'
            }, .18)
            .fromTo('.photo-chips', {
                opacity: 0,
                y: 20
            }, {
                opacity: 1,
                y: 0,
                duration: .7,
                ease: 'power3.out'
            }, .7)
            .fromTo('#heroTerminal', {
                opacity: 0,
                y: 24
            }, {
                opacity: 1,
                y: 0,
                duration: .8,
                ease: 'power3.out'
            }, .8)
            .fromTo('.scroll-hint', {
                opacity: 0
            }, {
                opacity: 1,
                duration: .5
            }, 1.75);
        /* Parallax on hero */
        const hero = document.getElementById('hero');
        hero.addEventListener('mousemove', e => {
            const r = hero.getBoundingClientRect();
            const x = (e.clientX - r.left - r.width / 2) / r.width;
            const y = (e.clientY - r.top - r.height / 2) / r.height;
            gsap.to('#photoFrame', {
                x: -x * 14,
                y: -y * 9,
                duration: .9,
                ease: 'power2.out'
            });
            gsap.to('#heroTerminal', {
                x: -x * 9,
                y: -y * 6,
                duration: 1,
                ease: 'power2.out'
            });
            gsap.to('.hero-left', {
                x: x * 6,
                y: y * 3,
                duration: 1.1,
                ease: 'power2.out'
            });
            gsap.to('.hero-orb', {
                x: x * 18,
                y: y * 12,
                duration: 1.5,
                ease: 'power2.out'
            });
        });
        hero.addEventListener('mouseleave', () => {
            gsap.to(['#photoFrame', '#heroTerminal', '.hero-left', '.hero-orb'], {
                x: 0,
                y: 0,
                duration: .9,
                ease: 'power2.out'
            });
        });
    }

    gsap.to('#heroCanvas', {
        opacity: .5,
        y: 80,
        ease: 'none',
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    /* ── PHOTO FRAME GSAP FLOAT ── */
    gsap.to('#photoFrame', {
        y: '-=10',
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2
    });

    window.Portfolio.startHero = startHero;
})();
