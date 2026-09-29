// =========================================================
// MÁSCARAS
// Formatam o texto enquanto a pessoa digita:
// 52998224725 -> 529.982.247-25
// =========================================================

// Remove tudo o que não for número
function somenteNumeros(texto) {
    return texto.replace(/\D/g, '');
}

export function mascaraCPF(texto) {
    const numeros = somenteNumeros(texto).slice(0, 11);

    return numeros
        .replace(/(\d{3})(\d)/, '$1.$2')          // 000.0
        .replace(/(\d{3})(\d)/, '$1.$2')          // 000.000.0
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');   // 000.000.000-00
}

export function mascaraTelefone(texto) {
    const numeros = somenteNumeros(texto).slice(0, 11);

    if (numeros.length === 0) return '';
    if (numeros.length <= 2) return `(${numeros}`;
    if (numeros.length <= 6) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;

    // Telefone fixo: 4 dígitos antes do traço. Celular: 5 dígitos.
    const tamanhoMeio = numeros.length === 11 ? 5 : 4;
    const meio = numeros.slice(2, 2 + tamanhoMeio);
    const fim = numeros.slice(2 + tamanhoMeio);

    return `(${numeros.slice(0, 2)}) ${meio}${fim ? '-' + fim : ''}`;
}

export function mascaraCEP(texto) {
    const numeros = somenteNumeros(texto).slice(0, 8);

    if (numeros.length <= 5) return numeros;
    return `${numeros.slice(0, 5)}-${numeros.slice(5)}`;
}

// Liga o nome usado no atributo data-mascara à função certa
const mascaras = {
    cpf: mascaraCPF,
    telefone: mascaraTelefone,
    cep: mascaraCEP
};

// Aplica a máscara indicada no atributo data-mascara do campo
export function aplicarMascara(campo) {
    const mascara = mascaras[campo.dataset.mascara];

    if (mascara) {
        campo.value = mascara(campo.value);
    }
}
