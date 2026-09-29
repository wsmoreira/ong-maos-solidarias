// =========================================================
// MENU
// Abre e fecha o menu do celular pelo botão hambúrguer e
// controla o fechamento do menu e do submenu com a tecla Esc.
// O atributo aria-expanded informa ao leitor de tela se o
// menu está aberto ("expandido") ou fechado ("recolhido").
// =========================================================

function botaoMenu() {
    return document.querySelector('.menu-botao');
}

function menuEstaAberto() {
    return botaoMenu().getAttribute('aria-expanded') === 'true';
}

// Usada também pelo roteador, para fechar o menu ao trocar de página
export function fecharMenu() {
    botaoMenu().setAttribute('aria-expanded', 'false');
}

export function iniciarMenu() {
    // Clique no botão hambúrguer: alterna entre aberto e fechado
    botaoMenu().addEventListener('click', () => {
        botaoMenu().setAttribute('aria-expanded', String(!menuEstaAberto()));
    });

    document.addEventListener('keydown', (evento) => {
        if (evento.key !== 'Escape') return;

        // Esc com o menu do celular aberto: fecha e devolve o foco ao botão
        if (menuEstaAberto()) {
            fecharMenu();
            botaoMenu().focus();
            return;
        }

        // Esc dentro do submenu de Projetos: esconde o submenu
        const itemComSubmenu = evento.target.closest('.tem-submenu');
        if (itemComSubmenu) {
            itemComSubmenu.classList.add('submenu-fechado');
        }
    });

    // O submenu volta a funcionar quando o foco ou o mouse saem dele
    document.querySelectorAll('.tem-submenu').forEach((item) => {
        item.addEventListener('focusout', (evento) => {
            if (!item.contains(evento.relatedTarget)) {
                item.classList.remove('submenu-fechado');
            }
        });

        item.addEventListener('mouseleave', () => {
            item.classList.remove('submenu-fechado');
        });
    });
}
