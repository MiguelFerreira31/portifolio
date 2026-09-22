/* ==========================================================================
   CURSOR — dot + ring que seguem o mouse com easing
   ========================================================================== */

(function() {
    const dot = document.getElementById('curDot'),
        ring = document.getElementById('curRing');
    let mx = 0,
        my = 0,
        rx = 0,
        ry = 0;
    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY
    });
    (function loop() {
        rx += (mx - rx) * .12;
        ry += (my - ry) * .12;
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a,button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.style.width = '50px';
            ring.style.height = '50px';
            ring.style.opacity = '.5'
        });
        el.addEventListener('mouseleave', () => {
            ring.style.width = '30px';
            ring.style.height = '30px';
            ring.style.opacity = '1'
        });
    });
})();
