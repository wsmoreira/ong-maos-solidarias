// =========================================================
// MODAL
// Abre qualquer <dialog> a partir de um botão com o atributo
// data-abrir-modal="id-do-modal".
// =========================================================

export function iniciarModais() {
    // O ouvinte fica no documento inteiro (delegação de eventos),
    // porque os botões são criados depois, pelos templates
    document.addEventListener('click', (evento) => {
        const botao = evento.target.closest('[data-abrir-modal]');

        if (!botao) {
            return;
        }

        const modal = document.getElementById(botao.dataset.abrirModal);

        if (modal) {
            modal.showModal();
        }
    });
}
