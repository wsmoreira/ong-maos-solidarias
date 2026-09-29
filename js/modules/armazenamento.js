// =========================================================
// ARMAZENAMENTO (localStorage)
// O localStorage só guarda texto, por isso os objetos são
// convertidos com JSON.stringify ao salvar e JSON.parse ao ler.
// =========================================================

export const CHAVE_CADASTROS = 'maos-solidarias:cadastros';
export const CHAVE_RASCUNHO = 'maos-solidarias:rascunho';

export function salvar(chave, valor) {
    try {
        localStorage.setItem(chave, JSON.stringify(valor));
    } catch (erro) {
        // Pode falhar em janelas anônimas ou se o armazenamento estiver cheio
        console.warn('Não foi possível salvar no localStorage:', erro);
    }
}

export function ler(chave, valorPadrao = null) {
    try {
        const texto = localStorage.getItem(chave);
        return texto ? JSON.parse(texto) : valorPadrao;
    } catch (erro) {
        console.warn('Não foi possível ler o localStorage:', erro);
        return valorPadrao;
    }
}

export function remover(chave) {
    try {
        localStorage.removeItem(chave);
    } catch (erro) {
        console.warn('Não foi possível remover do localStorage:', erro);
    }
}

// Lista de cadastros já enviados neste navegador
export function lerCadastros() {
    return ler(CHAVE_CADASTROS, []);
}

// Acrescenta um cadastro à lista e devolve o cadastro salvo e o total
export function adicionarCadastro(dados) {
    const cadastros = lerCadastros();
    const novoCadastro = {
        ...dados,
        dataCadastro: new Date().toISOString()
    };

    cadastros.push(novoCadastro);
    salvar(CHAVE_CADASTROS, cadastros);

    return { cadastro: novoCadastro, total: cadastros.length };
}
