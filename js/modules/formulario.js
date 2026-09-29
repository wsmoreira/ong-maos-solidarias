// =========================================================
// FORMULÁRIO DE CADASTRO
// Eventos do formulário: máscaras, validação, rascunho
// automático e envio com gravação no localStorage.
// =========================================================

import { aplicarMascara } from './mascaras.js';
import { validarCampo, validarFormulario } from './validacao.js';
import { salvar, ler, remover, adicionarCadastro, CHAVE_RASCUNHO } from './armazenamento.js';
import { formatarDataHora } from './datas.js';

const ID_FORMULARIO = 'form-cadastro';

// Confere se o elemento está dentro do formulário de cadastro
function pertenceAoFormulario(elemento) {
    return elemento.closest(`#${ID_FORMULARIO}`) !== null;
}

// ---------- Rascunho ----------

// Guarda tudo o que já foi digitado, para não perder nada ao recarregar
function salvarRascunho(formulario) {
    const dados = Object.fromEntries(new FormData(formulario));
    salvar(CHAVE_RASCUNHO, dados);
}

// Chamada pelo roteador sempre que a página de cadastro é aberta
export function restaurarRascunho() {
    const formulario = document.getElementById(ID_FORMULARIO);
    const rascunho = ler(CHAVE_RASCUNHO);

    if (!formulario || !rascunho) {
        return;
    }

    Object.entries(rascunho).forEach(([nome, valor]) => {
        const campo = formulario.elements[nome];
        if (campo) {
            campo.value = valor; // nos radios, marca a opção com esse valor
        }
    });

    document.getElementById('aviso-rascunho').hidden = false;
}

function limparFormulario(formulario) {
    formulario.reset();
    remover(CHAVE_RASCUNHO);

    formulario.querySelectorAll('[aria-invalid]').forEach((campo) => {
        campo.setCustomValidity?.('');
        campo.removeAttribute('aria-invalid');
    });
    formulario.querySelectorAll('.mensagem-campo').forEach((mensagem) => {
        mensagem.textContent = '';
    });

    document.getElementById('aviso-rascunho').hidden = true;
    formulario.elements.nome.focus();
}

// ---------- Confirmação ----------

// Monta a mensagem de sucesso com createElement e textContent.
// O nome foi digitado pelo usuário, então não usamos innerHTML aqui:
// o textContent trata tudo como texto e impede que código seja executado.
function mostrarConfirmacao(cadastro, totalCadastros) {
    const nome = cadastro.nome;
    const secao = document.createElement('section');
    secao.className = 'bloco';

    const titulo = document.createElement('h2');
    titulo.textContent = 'Cadastro realizado!';
    titulo.tabIndex = -1;

    const alerta = document.createElement('p');
    alerta.className = 'alerta alerta-sucesso';

    const destaque = document.createElement('strong');
    destaque.textContent = `Obrigado, ${nome.trim().split(' ')[0]}!`;

    alerta.append(destaque, 'Recebemos seus dados e em breve entraremos em contato.');

    const registro = document.createElement('p');
    registro.textContent = `Cadastro registrado em ${formatarDataHora(cadastro.dataCadastro)}.`;

    const contador = document.createElement('p');
    contador.textContent = `Cadastros salvos neste navegador: ${totalCadastros}.`;

    const link = document.createElement('a');
    link.href = '#/projetos';
    link.className = 'botao';
    link.textContent = 'Conhecer os projetos';

    secao.append(titulo, alerta, registro, contador, link);

    // replaceChildren() limpa o <main> e coloca a nova seção no lugar
    document.getElementById('conteudo').replaceChildren(secao);
    window.scrollTo(0, 0);
    titulo.focus();
}

// ---------- Eventos ----------

export function iniciarFormulario() {
    // Os ouvintes ficam no documento (delegação de eventos), porque o formulário
    // é criado e destruído pelo roteador a cada troca de página

    // 1. Digitação: aplica a máscara, revalida se já tinha erro e salva o rascunho
    document.addEventListener('input', (evento) => {
        const campo = evento.target;
        if (!pertenceAoFormulario(campo)) return;

        if (campo.dataset.mascara) {
            aplicarMascara(campo);
        }

        if (campo.hasAttribute('aria-invalid')) {
            validarCampo(campo);
        }

        salvarRascunho(campo.form);
    });

    // 2. Saída do campo: valida o que foi preenchido
    document.addEventListener('focusout', (evento) => {
        const campo = evento.target;
        if (!pertenceAoFormulario(campo) || !campo.name || campo.type === 'radio') return;

        if (campo.value || campo.hasAttribute('aria-invalid')) {
            validarCampo(campo);
        }
    });

    // 3. Clique no botão "Limpar formulário"
    document.addEventListener('click', (evento) => {
        if (evento.target.closest('[data-acao="limpar-formulario"]')) {
            limparFormulario(document.getElementById(ID_FORMULARIO));
        }
    });

    // 4. Envio do formulário
    document.addEventListener('submit', (evento) => {
        const formulario = evento.target;
        if (formulario.id !== ID_FORMULARIO) return;

        // Impede o envio padrão, que recarregaria a página
        evento.preventDefault();

        const primeiroErro = validarFormulario(formulario);

        if (primeiroErro) {
            primeiroErro.focus(); // leva a pessoa direto ao primeiro campo com problema
            return;
        }

        const dados = Object.fromEntries(new FormData(formulario));
        const { cadastro, total } = adicionarCadastro(dados);
        remover(CHAVE_RASCUNHO);
        mostrarConfirmacao(cadastro, total);
    });
}
