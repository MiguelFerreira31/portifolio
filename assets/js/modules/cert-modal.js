/* ==========================================================================
   CERT MODAL — exibe o PDF do certificado em um <dialog> nativo
   Os botões declaram o arquivo em data-pdf, o título em data-title e,
   opcionalmente, o link de validação online em data-verify.
   ========================================================================== */

(function() {
    const modal = document.getElementById('certModal');
    if (!modal || typeof modal.showModal !== 'function') return;
    const frame = document.getElementById('certFrame'),
        title = document.getElementById('certModalTitle'),
        openLink = document.getElementById('certOpen'),
        verifyLink = document.getElementById('certVerify');
    let opener = null;

    /* touch ou navegador sem visualizador de PDF embutido: abre direto em nova aba */
    const direct = () => matchMedia('(pointer: coarse)').matches || navigator.pdfViewerEnabled === false;

    function open(btn) {
        if (direct()) {
            window.open(btn.dataset.pdf, '_blank', 'noopener');
            return;
        }
        opener = btn;
        title.textContent = btn.dataset.title;
        frame.title = 'Certificado: ' + btn.dataset.title;
        frame.src = btn.dataset.pdf + '#view=FitH';
        openLink.href = btn.dataset.pdf;
        verifyLink.hidden = !btn.dataset.verify;
        if (btn.dataset.verify) verifyLink.href = btn.dataset.verify;
        document.body.style.overflow = 'hidden';
        modal.showModal();
    }

    document.querySelectorAll('.cert-link[data-pdf]').forEach(b => b.addEventListener('click', () => open(b)));
    document.getElementById('certClose').addEventListener('click', () => modal.close());
    /* clique no fundo escuro fecha */
    modal.addEventListener('click', e => {
        if (e.target === modal) modal.close();
    });
    modal.addEventListener('close', () => {
        frame.src = 'about:blank';
        document.body.style.overflow = '';
        if (opener) opener.focus();
    });
})();
