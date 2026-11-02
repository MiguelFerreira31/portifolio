/* ==========================================================================
   VLIBRAS — widget oficial do Governo Federal (tradução para Libras)
   Carrega o plugin sob demanda; se o serviço estiver fora do ar, o site
   continua funcionando normalmente.
   ========================================================================== */

(function() {
    const s = document.createElement('script');
    s.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    s.async = true;
    s.onload = () => {
        try {
            if (window.VLibras && window.VLibras.Widget) new window.VLibras.Widget('https://vlibras.gov.br/app');
        } catch (e) { /* serviço indisponível: o site segue normal */ }
    };
    s.onerror = () => {};
    document.body.appendChild(s);
})();
