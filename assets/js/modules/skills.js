/* ==========================================================================
   SKILLS — glow nos cards ao passar o mouse
   ========================================================================== */

document.querySelectorAll('.sk-card').forEach(c => {
    c.addEventListener('mouseenter', () => gsap.to(c, {
        boxShadow: '0 0 36px rgba(0,229,168,.09)',
        duration: .3
    }));
    c.addEventListener('mouseleave', () => gsap.to(c, {
        boxShadow: 'none',
        duration: .3
    }));
});

