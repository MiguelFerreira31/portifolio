/* ==========================================================================
   VLIBRAS — widget oficial do Governo Federal (tradução para Libras)
   Carrega o plugin sob demanda; se o serviço estiver fora do ar, o site
   continua funcionando normalmente.
   ========================================================================== */

(function() {
    const s = document.createElement('script');
    s.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    s.onload = () => new window.VLibras.Widget('https://vlibras.gov.br/app');
    document.body.appendChild(s);
})();
