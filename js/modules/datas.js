// =========================================================
// DATAS (biblioteca externa Day.js)
// A Day.js é carregada pela CDN jsDelivr, na versão de módulo (+esm).
// O carregamento é feito com import() dinâmico dentro de try/catch:
// se a CDN falhar (ex.: sem internet), o site continua funcionando
// com as funções de data nativas do JavaScript.
// =========================================================

const URL_DAYJS = 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/+esm';
const URL_IDIOMA = 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/locale/pt-br.js/+esm';

// Fica null até a biblioteca terminar de carregar
let dayjs = null;

export async function carregarBibliotecaDatas() {
    try {
        // /* @vite-ignore */ avisa o Vite para não tentar empacotar a biblioteca:
        // ela continua vindo da CDN, e o import acontece só no navegador
        const modulo = await import(/* @vite-ignore */ URL_DAYJS);
        const idioma = await import(/* @vite-ignore */ URL_IDIOMA);

        dayjs = modulo.default;
        dayjs.locale(idioma.default); // nomes de meses e dias em português
    } catch (erro) {
        console.warn('Day.js não carregou. Usando as datas nativas do JavaScript.', erro);
    }
}

// true se a data (ex.: "2030-01-15") for depois de hoje
export function dataNoFuturo(dataTexto) {
    if (dayjs) {
        return dayjs(dataTexto).isAfter(dayjs(), 'day');
    }
    return new Date(dataTexto) > new Date();
}

// Idade em anos completos
export function calcularIdade(dataTexto) {
    if (dayjs) {
        return dayjs().diff(dayjs(dataTexto), 'year');
    }
    const milissegundosPorAno = 365.25 * 24 * 60 * 60 * 1000;
    return Math.floor((new Date() - new Date(dataTexto)) / milissegundosPorAno);
}

// Ex.: "29 de setembro de 2026 às 16:40"
export function formatarDataHora(dataISO) {
    if (dayjs) {
        return dayjs(dataISO).format('D [de] MMMM [de] YYYY [às] HH:mm');
    }
    return new Date(dataISO).toLocaleString('pt-BR');
}
