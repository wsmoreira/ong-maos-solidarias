// =========================================================
// ROTEADOR DA SPA
// Lê o endereço depois do "#" e mostra o template certo,
// sem recarregar a página.
// Exemplos: #/inicio, #/projetos, #/projetos/voluntariado
// =========================================================

import { projetos, estados } from './dados.js';
import {
    templateInicio,
    templateProjetos,
    templateCadastro,
    templateNaoEncontrada
} from './templates.js';
import { restaurarRascunho } from './formulario.js';

// Cada rota tem um título (para a aba do navegador), uma função que gera o HTML
// e, se precisar, uma função "depois" que roda quando o HTML já está na tela
const rotas = {
    inicio:   { titulo: 'Início',   template: () => templateInicio() },
    projetos: { titulo: 'Projetos', template: () => templateProjetos(projetos) },
    cadastro: { titulo: 'Cadastro', template: () => templateCadastro(estados), depois: restaurarRascunho }
};

// Transforma "#/projetos/voluntariado" em { pagina: 'projetos', secao: 'voluntariado' }
function lerEndereco() {
    const partes = window.location.hash.replace('#/', '').split('/');
    return {
        pagina: partes[0] || 'inicio',
        secao: partes[1] || null
    };
}

// Marca no menu a página atual e fecha o menu do celular
function atualizarMenu(pagina) {
    const links = document.querySelectorAll('.menu a[data-rota]');

    links.forEach((link) => {
        if (link.dataset.rota === pagina) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });

    document.querySelector('#menu-toggle').checked = false;
}

// Desenha a página atual dentro do <main>
function mostrarPagina(mudouDePagina) {
    const { pagina, secao } = lerEndereco();
    const rota = rotas[pagina];
    const conteudo = document.querySelector('#conteudo');

    if (rota) {
        conteudo.innerHTML = rota.template();
        document.title = `Mãos Solidárias - ${rota.titulo}`;

        if (rota.depois) {
            rota.depois();
        }
    } else {
        conteudo.innerHTML = templateNaoEncontrada();
        document.title = 'Mãos Solidárias - Página não encontrada';
    }

    atualizarMenu(pagina);

    // Se o endereço tem uma seção (ex.: #/projetos/doacoes), rola até ela
    const alvo = secao ? document.getElementById(secao) : null;

    if (alvo) {
        alvo.scrollIntoView();
    } else {
        window.scrollTo(0, 0);
    }

    // Acessibilidade: leva o foco para o título da nova página,
    // para o leitor de tela anunciar que o conteúdo mudou
    if (mudouDePagina) {
        const titulo = (alvo || conteudo).querySelector('h2');
        titulo.setAttribute('tabindex', '-1');
        titulo.focus({ preventScroll: true });
    }
}

export function iniciarRotas() {
    // Toda vez que o endereço depois do "#" muda, a página é redesenhada
    window.addEventListener('hashchange', () => mostrarPagina(true));

    // Clique em um link para a página em que a pessoa já está (ex.: "Cadastro"
    // depois de enviar o formulário): o hash não muda, então redesenhamos na mão
    document.addEventListener('click', (evento) => {
        const link = evento.target.closest('a[href^="#/"]');

        if (link && link.getAttribute('href') === window.location.hash) {
            evento.preventDefault();
            mostrarPagina(true);
        }
    });

    // Primeira exibição, quando o site abre
    mostrarPagina(false);
}
