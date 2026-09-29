// =========================================================
// MENU
// Fecha o menu do celular com a tecla Esc.
// (abrir e fechar pelo botão hambúrguer continua sendo feito pelo CSS)
// =========================================================

export function iniciarMenu() {
    const botaoMenu = document.getElementById('menu-toggle');

    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape' && botaoMenu.checked) {
            botaoMenu.checked = false;
            botaoMenu.focus();
        }
    });
}
