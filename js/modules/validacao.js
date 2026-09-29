// =========================================================
// VALIDAÇÃO
// Confere cada campo e mostra uma mensagem explicando o erro.
// Usa a validação nativa do HTML (required, pattern, type)
// e acrescenta regras que o HTML sozinho não consegue fazer.
// =========================================================

import { lerCadastros } from './armazenamento.js';
import { dataNoFuturo, calcularIdade } from './datas.js';

// Mensagens de cada campo: quando está vazio e quando o formato está errado
const mensagens = {
    nome:         { vazio: 'Informe seu nome completo.',       formato: 'O nome precisa ter pelo menos 3 letras.' },
    email:        { vazio: 'Informe seu e-mail.',              formato: 'Digite um e-mail válido, como nome@email.com.' },
    cpf:          { vazio: 'Informe seu CPF.',                 formato: 'Digite os 11 números do CPF.' },
    telefone:     { vazio: 'Informe seu telefone.',            formato: 'Digite o telefone com DDD, como (41) 99999-8888.' },
    nascimento:   { vazio: 'Informe sua data de nascimento.',  formato: 'Digite uma data válida.' },
    cep:          { vazio: 'Informe seu CEP.',                 formato: 'Digite os 8 números do CEP.' },
    endereco:     { vazio: 'Informe seu endereço.',            formato: '' },
    cidade:       { vazio: 'Informe sua cidade.',              formato: '' },
    estado:       { vazio: 'Selecione seu estado.',            formato: '' },
    participacao: { vazio: 'Escolha se quer ser doador ou voluntário.', formato: '' }
};

// Confere os dois dígitos verificadores do CPF (cálculo oficial da Receita)
export function cpfValido(cpf) {
    const numeros = cpf.replace(/\D/g, '');

    // Precisa ter 11 números e não pode ser tudo igual (ex.: 111.111.111-11)
    if (numeros.length !== 11 || /^(\d)\1{10}$/.test(numeros)) {
        return false;
    }

    function calcularDigito(quantidade) {
        let soma = 0;
        for (let i = 0; i < quantidade; i++) {
            soma += Number(numeros[i]) * (quantidade + 1 - i);
        }
        const resto = (soma * 10) % 11;
        return resto === 10 ? 0 : resto;
    }

    return calcularDigito(9) === Number(numeros[9]) &&
           calcularDigito(10) === Number(numeros[10]);
}

function cpfJaCadastrado(cpf) {
    return lerCadastros().some((cadastro) => cadastro.cpf === cpf);
}

// Regras extras, além da validação do HTML. Devolvem a mensagem de erro, ou '' se estiver certo.
const regrasExtras = {
    nome(valor) {
        return valor.trim().split(/\s+/).length < 2 ? 'Digite nome e sobrenome.' : '';
    },
    cpf(valor) {
        if (!cpfValido(valor)) return 'CPF inválido. Confira os números digitados.';
        if (cpfJaCadastrado(valor)) return 'Este CPF já foi cadastrado.';
        return '';
    },
    nascimento(valor) {
        if (dataNoFuturo(valor)) return 'A data de nascimento não pode estar no futuro.';
        if (calcularIdade(valor) > 120) return 'Confira o ano de nascimento.';
        return '';
    }
};

// Descobre qual é o erro do campo (ou devolve '' se não houver)
function descobrirErro(campo) {
    const estado = campo.validity;
    const textos = mensagens[campo.name];

    if (estado.valueMissing) return textos.vazio;
    if (estado.typeMismatch || estado.patternMismatch || estado.tooShort) return textos.formato;

    const regra = regrasExtras[campo.name];
    return regra ? regra(campo.value) : '';
}

// Pinta o campo de verde ou vermelho e escreve a mensagem embaixo dele
function marcarCampo(campo, erro) {
    // Nos botões de opção (radio), marca o grupo inteiro
    const grupo = campo.type === 'radio'
        ? campo.form.querySelectorAll(`[name="${campo.name}"]`)
        : [campo];

    grupo.forEach((elemento) => {
        elemento.setAttribute('aria-invalid', erro ? 'true' : 'false');
    });

    const mensagem = document.getElementById(`${campo.name}-erro`);
    if (mensagem) {
        mensagem.textContent = erro;
    }
}

// Valida um campo e devolve true (certo) ou false (errado)
export function validarCampo(campo) {
    const ehRadio = campo.type === 'radio';

    if (!ehRadio) campo.setCustomValidity('');   // limpa um erro anterior
    const erro = descobrirErro(campo);
    if (!ehRadio) campo.setCustomValidity(erro); // mantém o :valid/:invalid do CSS em sintonia

    marcarCampo(campo, erro);
    return !erro;
}

// Valida o formulário inteiro e devolve o primeiro campo com erro (ou null)
export function validarFormulario(formulario) {
    const nomesConferidos = new Set();
    let primeiroErro = null;

    for (const campo of formulario.elements) {
        // Ignora botões e campos já conferidos (os radios têm o mesmo name)
        if (!campo.name || !mensagens[campo.name] || nomesConferidos.has(campo.name)) continue;
        nomesConferidos.add(campo.name);

        const valido = validarCampo(campo);
        if (!valido && !primeiroErro) {
            primeiroErro = campo;
        }
    }

    return primeiroErro;
}
