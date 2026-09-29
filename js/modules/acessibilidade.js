// =========================================================
// ACESSIBILIDADE
// - Botão "Alto contraste", com a escolha salva no localStorage
// - Link "Ir para o conteúdo", que leva o foco direto ao <main>
// =========================================================

import { salvar, ler } from './armazenamento.js';

const CHAVE_CONTRASTE = 'maos-solidarias:alto-contraste';

function aplicarContraste(ativo) {
    // O CSS troca as variáveis de cor quando a tag <html> tem data-contraste="alto"
    document.documentElement.dataset.contraste = ativo ? 'alto' : 'normal';

    // aria-pressed avisa o leitor de tela se o botão está ligado ou desligado
    document.getElementById('botao-contraste').setAttribute('aria-pressed', String(ativo));
}

export function iniciarAcessibilidade() {
    // Usa a escolha salva. Se a pessoa nunca escolheu, segue a configuração
    // de contraste do sistema operacional (prefers-contrast: more)
    const escolhaSalva = ler(CHAVE_CONTRASTE);
    const sistemaPedeContraste = window.matchMedia('(prefers-contrast: more)').matches;

    aplicarContraste(escolhaSalva ?? sistemaPedeContraste);

    document.getElementById('botao-contraste').addEventListener('click', () => {
        const ativo = document.documentElement.dataset.contraste !== 'alto';
        aplicarContraste(ativo);
        salvar(CHAVE_CONTRASTE, ativo);
    });

    // O link usa preventDefault porque o "#" do endereço é reservado para as rotas da SPA
    document.querySelector('.link-pular').addEventListener('click', (evento) => {
        evento.preventDefault();
        const conteudo = document.getElementById('conteudo');
        conteudo.focus();
        conteudo.scrollIntoView();
    });
}
