/* ==========================================================================
   CURSOR — dot + ring que seguem o mouse com easing
   ========================================================================== */

(function() {
    if (!matchMedia('(pointer: fine)').matches || !window.Portfolio.canAnimate) return;
    const dot = document.getElementById('curDot'),
        ring = document.getElementById('curRing');
    let mx = 0,
        my = 0,
        rx = 0,
        ry = 0;
    let running = false;
    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        document.body.classList.add('cursor-on');
        if (!running) {
            running = true;
            requestAnimationFrame(loop);
        }
    });
    /* o loop só roda enquanto o anel ainda alcança o mouse (ocioso = 0 quadros) */
    function loop() {
        rx += (mx - rx) * .12;
        ry += (my - ry) * .12;
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        if (Math.abs(mx - rx) < .1 && Math.abs(my - ry) < .1) running = false;
        else requestAnimationFrame(loop);
    }
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
