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
            }
        }
    });
});

/* ── SECTION TITLE SPLIT ── */
document.querySelectorAll('.sec-title').forEach(el => {
    const text = el.textContent;
    el.setAttribute('aria-label', text);
    /* uma span por palavra impede a quebra de linha no meio de uma palavra */
    el.innerHTML = text.split(' ').map(w => '<span class="split-word" aria-hidden="true">' + w.replace(/(\S)/g, '<span class="split-char" style="opacity:0">$1</span>') + '</span>').join(' ');
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

