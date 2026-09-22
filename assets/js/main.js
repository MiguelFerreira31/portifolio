/* ==========================================================================
   MAIN — bootstrap da aplicação
   Registra os plugins do GSAP, bloqueia o scroll durante o preloader e cria
   o namespace global usado para a comunicação entre os módulos.
   Deve ser carregado ANTES de qualquer arquivo de assets/js/modules/.
   ========================================================================== */

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* Namespace único da aplicação — evita poluir o escopo global.
   Os módulos registram aqui apenas o que precisa ser chamado de fora. */
window.Portfolio = window.Portfolio || {};

/* O scroll é liberado pelo preloader ao final do carregamento. */
document.body.style.overflowY = 'hidden';
