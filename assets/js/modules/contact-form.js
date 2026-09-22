/* ==========================================================================
   CONTACT FORM — feedback visual do envio
   Demonstração de UI: não há back-end, o botão apenas confirma a ação.
   ========================================================================== */

(function() {
    const btn = document.getElementById('submitBtn');
    if (!btn) return;

    btn.addEventListener('click', e => {
        e.preventDefault();
        btn.textContent = 'ENVIANDO...';
        setTimeout(() => {
            btn.textContent = '✓ MENSAGEM ENVIADA!';
            setTimeout(() => {
                btn.textContent = 'ENVIAR MENSAGEM →'
            }, 3000)
        }, 1200);
    });
})();
