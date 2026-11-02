/* ==========================================================================
   CONTACT FORM — monta a mensagem e abre o WhatsApp com o texto pronto
   Não há back-end: o envio acontece pelo próprio WhatsApp (wa.me).
   ========================================================================== */

(function() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const note = document.getElementById('formNote');
    const WA = '5511951863723';

    form.addEventListener('submit', e => {
        e.preventDefault();
        const d = new FormData(form);
        const lines = ['Olá, Miguel! Vim pelo seu portfólio.', ''];
        lines.push('*Nome:* ' + d.get('nome'));
        if (d.get('email')) lines.push('*E-mail:* ' + d.get('email'));
        if (d.get('assunto')) lines.push('*Assunto:* ' + d.get('assunto'));
        lines.push('', d.get('mensagem'));
        const url = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(lines.join('\n'));
        window.open(url, '_blank', 'noopener');
        note.textContent = 'Abrindo o WhatsApp… Se nada abrir, chame direto em (11) 95186-3723.';
    });
})();
