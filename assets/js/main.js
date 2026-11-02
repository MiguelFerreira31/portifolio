/* ==========================================================================
   MAIN — bootstrap da aplicação
   Detecta GSAP (carregado com defer + SRI), registra os plugins e cria o
   namespace global usado pelos módulos. Deve vir ANTES de assets/js/modules/.
   Sem GSAP (CDN fora do ar, SRI recusado): classes no-anim/no-gsap deixam o
   site totalmente visível e estático.
   ========================================================================== */

const root = document.documentElement;
if (!window.gsap || !window.ScrollTrigger) root.classList.add('no-anim', 'no-gsap');
else gsap.registerPlugin(ScrollTrigger, window.ScrollToPlugin);

/* Namespace único da aplicação — evita poluir o escopo global. */
window.Portfolio = window.Portfolio || {};
/* true quando há GSAP e o usuário não pediu movimento reduzido */
window.Portfolio.canAnimate = !root.classList.contains('no-anim');
/* pausa animações quando a aba está oculta (CSS: html.paused) */
document.addEventListener('visibilitychange', () => root.classList.toggle('paused', document.hidden));
