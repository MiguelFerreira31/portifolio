/* ==========================================================================
   HERO CANVAS — nebulosa, campo de estrelas e meteoros (Canvas 2D)
   ========================================================================== */

(function() {
    const cv = document.getElementById('heroCanvas'),
        ctx = cv.getContext('2d');
    let W, H, stars = [],
        meteors = [];

    function resize() {
        W = cv.width = cv.offsetWidth;
        H = cv.height = cv.offsetHeight;
        stars = Array.from({
            length: 200
        }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.4 + .2,
            base: Math.random() * .55 + .08,
            tw: Math.random() * Math.PI * 2,
            sp: Math.random() * .012 + .004,
            cyan: Math.random() < .14
        }));
    }

    function spawnMeteor() {
        if (meteors.length > 7) return;
        const big = Math.random() < .22;
        meteors.push({
            x: Math.random() * W * .75 + W * .05,
            y: Math.random() * H * .45,
            vx: big ? 13 + Math.random() * 10 : 7 + Math.random() * 8,
            vy: big ? 6 + Math.random() * 5 : 3 + Math.random() * 5,
            len: big ? 230 + Math.random() * 110 : 80 + Math.random() * 100,
            life: 0,
            maxLife: big ? 78 : 55,
            big,
            alpha: 0
        });
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        /* Ambient nebula */
        const nb = ctx.createRadialGradient(W * .42, H * .3, 0, W * .42, H * .3, W * .52);
        nb.addColorStop(0, 'rgba(0,229,168,.03)');
        nb.addColorStop(.5, 'rgba(139,0,255,.015)');
        nb.addColorStop(1, 'transparent');
        ctx.fillStyle = nb;
        ctx.fillRect(0, 0, W, H);
        /* Stars */
        stars.forEach(s => {
            s.tw += s.sp;
            const a = s.base * (0.42 + 0.58 * Math.sin(s.tw));
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = s.cyan ? `rgba(0,229,168,${a})` : `rgba(204,238,221,${a})`;
            ctx.fill();
            if (s.r > 1.1 && Math.sin(s.tw) > .72) {
                ctx.strokeStyle = s.cyan ? `rgba(0,229,168,${a * .45})` : `rgba(255,255,255,${a * .3})`;
                ctx.lineWidth = .4;
                const sz = s.r * 3.5;
                ctx.beginPath();
                ctx.moveTo(s.x - sz, s.y);
                ctx.lineTo(s.x + sz, s.y);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(s.x, s.y - sz);
                ctx.lineTo(s.x, s.y + sz);
                ctx.stroke();
            }
        });
        /* Shooting stars / meteors */
        for (let i = meteors.length - 1; i >= 0; i--) {
            const m = meteors[i];
            m.x += m.vx;
            m.y += m.vy;
            m.life++;
            const p = m.life / m.maxLife;
            m.alpha = p < .22 ? p / .22 : Math.max(0, 1 - (p - .22) / .78);
            const ang = Math.atan2(m.vy, m.vx);
            const tx = m.x - Math.cos(ang) * m.len,
                ty = m.y - Math.sin(ang) * m.len;
            const g = ctx.createLinearGradient(tx, ty, m.x, m.y);
            g.addColorStop(0, 'rgba(0,229,168,0)');
            g.addColorStop(.5, `rgba(0,229,168,${m.alpha * .5})`);
            g.addColorStop(.82, `rgba(255,255,255,${m.alpha * .88})`);
            g.addColorStop(1, 'rgba(0,229,168,0)');
            ctx.beginPath();
            ctx.moveTo(tx, ty);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = g;
            ctx.lineWidth = m.big ? 2.3 : 1.4;
            ctx.stroke();
            if (m.big) {
                const hg = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 11);
                hg.addColorStop(0, `rgba(255,255,255,${m.alpha * .9})`);
                hg.addColorStop(.4, `rgba(0,229,168,${m.alpha * .5})`);
                hg.addColorStop(1, 'transparent');
                ctx.fillStyle = hg;
                ctx.beginPath();
                ctx.arc(m.x, m.y, 11, 0, Math.PI * 2);
                ctx.fill();
            }
            if (m.life >= m.maxLife || m.x > W + 200 || m.y > H + 200) meteors.splice(i, 1);
        }
        requestAnimationFrame(draw);
    }
    setInterval(spawnMeteor, 2200);
    setTimeout(spawnMeteor, 700);
    setTimeout(spawnMeteor, 1600);
    resize();
    draw();
    window.addEventListener('resize', resize);
})();


