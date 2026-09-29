// =========================================================
// TEMPLATES
// Cada função devolve um texto com o HTML de uma parte da
// página. O roteador coloca esse HTML dentro do <main>.
// =========================================================

// O index.html fica na pasta /html, então as imagens estão em ../imagens
const PASTA_IMAGENS = '../imagens/';


// ---------- Componentes reaproveitáveis ----------

// Imagem em dois formatos: .webp (mais leve) com .jpg de reserva
function templateImagem(imagem) {
    return `
        <picture>
            <source srcset="${PASTA_IMAGENS}${imagem.arquivo}.webp" type="image/webp">
            <img src="${PASTA_IMAGENS}${imagem.arquivo}.jpg" alt="${imagem.alt}"
                 width="${imagem.largura}" height="${imagem.altura}">
        </picture>
    `;
}

// Etiqueta (badge). O tipo muda a cor: sucesso, aviso ou erro
function templateBadge(texto, tipo = '') {
    const classeTipo = tipo ? ` badge-${tipo}` : '';
    return `<span class="badge${classeTipo}">${texto}</span>`;
}

// Caixa de alerta. O tipo pode ser: info, aviso, sucesso ou erro
function templateAlerta(tipo, titulo, texto) {
    return `
        <p class="alerta alerta-${tipo}">
            <strong>${titulo}</strong>
            ${texto}
        </p>
    `;
}

// Card de um projeto, montado a partir de um objeto da lista de dados
export function templateCardProjeto(projeto) {
    return `
        <article class="card col-12 col-sm-6 col-lg-4">
            <h3>${projeto.titulo}</h3>
            <p class="badges">
                ${templateBadge(projeto.categoria)}
                ${templateBadge(projeto.status.texto, projeto.status.tipo)}
            </p>
            ${projeto.imagem ? templateImagem(projeto.imagem) : ''}
            <p>${projeto.descricao}</p>
        </article>
    `;
}


// ---------- Páginas ----------

export function templateInicio() {
    return `
        <div class="grid">
            <section class="bloco col-12">
                <h2>Quem somos</h2>
                <div class="apresentacao">
                    ${templateImagem({
                        arquivo: 'equipe',
                        alt: 'Dois voluntários com camisetas azuis segurando vasos com mudas de plantas',
                        largura: 600,
                        altura: 400
                    })}
                    <p>O Instituto Mãos Solidárias é uma organização sem fins lucrativos que atua desde 2015 apoiando famílias em situação de vulnerabilidade social.</p>
                </div>
            </section>

            <section class="bloco col-12 col-md-6">
                <h2>Nossa missão</h2>
                <p>Promover dignidade e oportunidades por meio da educação, da alimentação e do trabalho voluntário.</p>
            </section>

            <section class="bloco col-12 col-md-6">
                <h2>Como ajudar</h2>
                <p>Você pode contribuir como doador ou voluntário. Conheça nossos <a href="#/projetos">projetos</a> ou faça seu <a href="#/cadastro">cadastro</a>.</p>
            </section>
        </div>
    `;
}

export function templateProjetos(listaProjetos) {
    // map() transforma cada projeto em um card, e join('') junta tudo em um texto só
    const cards = listaProjetos.map(templateCardProjeto).join('');

    return `
        <section class="secao" id="projetos-sociais">
            <h2>Nossos projetos sociais</h2>
            <p class="introducao">Conheça as iniciativas que desenvolvemos junto à comunidade.</p>
            <div class="grid">
                ${cards}
            </div>
        </section>

        <div class="grid">
            <section class="bloco col-12 col-lg-6" id="voluntariado">
                <h2>Voluntariado</h2>
                ${templateImagem({
                    arquivo: 'voluntariado',
                    alt: 'Voluntário de luvas em primeiro plano e grupo recolhendo lixo em um bosque ao fundo',
                    largura: 600,
                    altura: 338
                })}
                <p>Doe seu tempo e seus conhecimentos. Veja como você pode participar:</p>
                <ul>
                    <li>Dar aulas no Reforço Escolar</li>
                    <li>Ajudar no preparo das refeições da Cozinha Comunitária</li>
                    <li>Ministrar oficinas na Capacitação Profissional</li>
                </ul>
                <p>Para participar, faça seu <a href="#/cadastro">cadastro como voluntário</a>.</p>
            </section>

            <section class="bloco col-12 col-lg-6" id="doacoes">
                <h2>Campanhas de doação</h2>
                ${templateAlerta('aviso', 'Campanha prioritária',
                    'Nosso estoque de alimentos não perecíveis está baixo. Doações de arroz, feijão e óleo são as mais necessárias neste mês.')}
                <p>Suas doações mantêm nossos projetos funcionando. Aceitamos:</p>
                <ul>
                    <li>Alimentos não perecíveis</li>
                    <li>Material escolar</li>
                    <li>Doações em dinheiro</li>
                </ul>
                <p>Para contribuir, faça seu <a href="#/cadastro">cadastro como doador</a>.</p>
            </section>
        </div>
    `;
}

// Campo do formulário: rótulo, entrada e espaço para a mensagem de erro
function templateCampo({ id, rotulo, tipo = 'text', colunas = 'col-12', extras = '' }) {
    return `
        <p class="campo ${colunas}">
            <label for="${id}">${rotulo}</label>
            <input type="${tipo}" id="${id}" name="${id}" aria-describedby="${id}-erro" ${extras} required>
            <span class="mensagem-campo" id="${id}-erro"></span>
        </p>
    `;
}

export function templateCadastro(listaEstados) {
    const opcoesEstados = listaEstados
        .map((estado) => `<option value="${estado.sigla}">${estado.nome}</option>`)
        .join('');

    return `
        <section>
            <h2>Seja um doador ou voluntário</h2>
            <p class="introducao">Preencha o formulário abaixo para fazer parte da nossa rede.</p>

            <p class="alerta alerta-info">
                <strong>Antes de começar</strong>
                Todos os campos são obrigatórios.
                <button type="button" class="link-modal" data-abrir-modal="modal-privacidade">Por que pedimos seus dados?</button>
            </p>

            <p class="alerta alerta-info" id="aviso-rascunho" hidden>
                <strong>Continuando de onde você parou</strong>
                Recuperamos os dados que você já tinha preenchido.
            </p>

            <!-- novalidate: a validação passa a ser feita pelo JavaScript (validacao.js) -->
            <form id="form-cadastro" method="post" novalidate>
                <fieldset>
                    <legend>Dados pessoais</legend>
                    <div class="grid">
                        ${templateCampo({ id: 'nome', rotulo: 'Nome completo:', extras: 'minlength="3" autocomplete="name"' })}
                        ${templateCampo({ id: 'email', rotulo: 'E-mail:', tipo: 'email', colunas: 'col-12 col-md-6',
                            extras: 'placeholder="exemplo@email.com" autocomplete="email"' })}
                        ${templateCampo({ id: 'cpf', rotulo: 'CPF:', colunas: 'col-12 col-md-6',
                            extras: 'placeholder="000.000.000-00" maxlength="14" inputmode="numeric" data-mascara="cpf" pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}"' })}
                        ${templateCampo({ id: 'telefone', rotulo: 'Telefone:', tipo: 'tel', colunas: 'col-12 col-md-6',
                            extras: 'placeholder="(00) 00000-0000" maxlength="15" data-mascara="telefone" autocomplete="tel" pattern="\\(\\d{2}\\) \\d{4,5}-\\d{4}"' })}
                        ${templateCampo({ id: 'nascimento', rotulo: 'Data de nascimento:', tipo: 'date', colunas: 'col-12 col-md-6' })}
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Endereço</legend>
                    <div class="grid">
                        ${templateCampo({ id: 'cep', rotulo: 'CEP:', colunas: 'col-12 col-md-4',
                            extras: 'placeholder="00000-000" maxlength="9" inputmode="numeric" data-mascara="cep" autocomplete="postal-code" pattern="\\d{5}-\\d{3}"' })}
                        ${templateCampo({ id: 'endereco', rotulo: 'Endereço:', colunas: 'col-12 col-md-8',
                            extras: 'placeholder="Rua, número e complemento" autocomplete="street-address"' })}
                        ${templateCampo({ id: 'cidade', rotulo: 'Cidade:', colunas: 'col-12 col-md-8', extras: 'autocomplete="address-level2"' })}
                        <p class="campo col-12 col-md-4">
                            <label for="estado">Estado:</label>
                            <select id="estado" name="estado" aria-describedby="estado-erro" required>
                                <option value="">Selecione</option>
                                ${opcoesEstados}
                            </select>
                            <span class="mensagem-campo" id="estado-erro"></span>
                        </p>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Forma de participação</legend>
                    <div class="opcoes">
                        <p>
                            <input type="radio" id="doador" name="participacao" value="doador" aria-describedby="participacao-erro" required>
                            <label for="doador">Quero ser doador</label>
                        </p>
                        <p>
                            <input type="radio" id="voluntario" name="participacao" value="voluntario" aria-describedby="participacao-erro">
                            <label for="voluntario">Quero ser voluntário</label>
                        </p>
                    </div>
                    <p class="mensagem-campo" id="participacao-erro"></p>
                </fieldset>

                <div aria-live="polite">
                    ${templateAlerta('erro alerta-formulario', 'Há campos para corrigir',
                        'Confira os campos marcados em vermelho antes de enviar.')}
                    ${templateAlerta('sucesso alerta-formulario', 'Tudo certo!',
                        'Todos os campos foram preenchidos corretamente. Agora é só enviar.')}
                </div>

                <div class="acoes-formulario">
                    <button type="submit" class="botao">Enviar cadastro</button>
                    <button type="button" class="botao botao-secundario" data-acao="limpar-formulario">Limpar formulário</button>
                </div>
            </form>
        </section>

        <!-- Modal: aberto pelo JavaScript com showModal() -->
        <dialog id="modal-privacidade" class="modal" aria-labelledby="modal-titulo">
            <form method="dialog">
                <button class="modal-fechar" aria-label="Fechar">&times;</button>
                <h3 id="modal-titulo">Por que pedimos seus dados?</h3>
                <p>Usamos suas informações apenas para entrar em contato sobre doações e atividades voluntárias. O CPF evita cadastros duplicados, e o endereço nos ajuda a indicar ações perto de você.</p>
                <p>Seus dados não são compartilhados com terceiros, conforme a Lei Geral de Proteção de Dados (LGPD).</p>
                <button class="botao">Entendi</button>
            </form>
        </dialog>
    `;
}

export function templateNaoEncontrada() {
    return `
        <section class="bloco">
            <h2>Página não encontrada</h2>
            <p>O endereço acessado não existe. <a href="#/inicio">Voltar para o início</a>.</p>
        </section>
    `;
}
