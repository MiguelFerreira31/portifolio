/* ==========================================================================
   REVEAL — ScrollTrigger dos elementos, itens da timeline e split dos títulos
   ========================================================================== */

gsap.utils.toArray('.reveal').forEach(el => {
    gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: .9,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none'
        }
    });
});

ScrollTrigger.batch('.sk-card', {
    start: 'top 88%',
    onEnter: b => gsap.to(b, {
        opacity: 1,
        y: 0,
        duration: .65,
        stagger: .09,
        ease: 'power3.out'
    })
});
ScrollTrigger.batch('.proj-card', {
    start: 'top 90%',
    onEnter: b => gsap.to(b, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: .65,
        stagger: .09,
        ease: 'power3.out'
    })
});

/* ── EXPERIENCE ITEMS ── */
gsap.utils.toArray('.exp-item').forEach((item, i) => {
    gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: .8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
            onEnter: () => {
                /* dot pulse */
                const dot = item.querySelector('.exp-dot');
                gsap.fromTo(dot, {
                    boxShadow: '0 0 0 transparent'
                }, {
                    boxShadow: '0 0 28px rgba(0,229,168,.55)',
                    duration: .8,
                    ease: 'power2.out'
                });
                /* progress bars */
                item.querySelectorAll('.sk-bar-fill').forEach(b => {
                    gsap.to(b, {
                        width: b.dataset.w + '%',
                        duration: 1.3,
                        ease: 'power2.out',
                        delay: .3
                    });
                });
            }
        }
    });
});

/* ── SECTION TITLE SPLIT ── */
document.querySelectorAll('.sec-title').forEach(el => {
    const html = el.innerHTML;
    el.innerHTML = html.replace(/(\S)/g, '<span class="split-char" style="opacity:0;display:inline-block">$1</span>');
    gsap.to(el.querySelectorAll('.split-char'), {
        opacity: 1,
        y: 0,
        duration: .05,
        stagger: .028,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none'
        }
    });
});

