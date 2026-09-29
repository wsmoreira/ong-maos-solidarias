# Instituto Mãos Solidárias

Plataforma web de uma ONG fictícia que apresenta seus projetos sociais e permite o cadastro de doadores e voluntários.

Projeto desenvolvido na disciplina de **Desenvolvimento Front-end** do curso de Análise e Desenvolvimento de Sistemas (Universidade Positivo), ao longo de quatro experiências práticas: HTML semântico, CSS, JavaScript e fluxo profissional (Git, acessibilidade e deploy).

---

## Funcionalidades

- **Single Page Application (SPA):** navegação entre Início, Projetos e Cadastro sem recarregar a página.
- **Templates dinâmicos:** os cards de projetos e as opções do formulário são gerados em JavaScript a partir de uma lista de dados.
- **Formulário com validação completa:**
  - máscaras automáticas de CPF, telefone e CEP;
  - mensagem de erro em cada campo;
  - conferência dos dígitos verificadores do CPF e bloqueio de CPF repetido;
  - data de nascimento validada com a biblioteca Day.js.
- **Armazenamento local:** cadastros e rascunho salvos no `localStorage`. Se a página for recarregada no meio do preenchimento, os dados voltam.
- **Layout responsivo:** grid de 12 colunas com 5 breakpoints e menu hambúrguer no celular.
- **Acessibilidade (WCAG 2.1 nível AA):** modo de alto contraste, link para pular ao conteúdo, navegação completa por teclado e atributos ARIA.

## Tecnologias

- HTML5 semântico
- CSS3 (variáveis, Grid, Flexbox e media queries)
- JavaScript (ES6 Modules), sem frameworks
- [Day.js](https://day.js.org/) 1.11.13, carregada pela CDN jsDelivr
- [Vite](https://vite.dev/) 8 e html-minifier-terser, usados só no build de produção

## Estrutura de pastas

```
ong/
├── index.html            # redireciona para html/index.html
├── package.json          # scripts e dependências do build
├── vite.config.js        # configuração do build de produção
├── html/
│   └── index.html        # página única da aplicação (SPA)
├── css/
│   ├── reset.css         # remove diferenças entre navegadores
│   └── styles.css        # design system, layout e componentes
├── imagens/              # fotos em .jpg, .webp e .png
└── js/
    ├── main.js           # ponto de entrada: inicia os módulos
    └── modules/
        ├── router.js         # navegação da SPA (rotas por hash)
        ├── templates.js      # geração do HTML de cada página
        ├── dados.js          # lista de projetos e de estados
        ├── formulario.js     # eventos do formulário
        ├── validacao.js      # regras de validação
        ├── mascaras.js       # máscaras de CPF, telefone e CEP
        ├── armazenamento.js  # acesso ao localStorage
        ├── datas.js          # integração com a Day.js
        ├── modal.js          # abertura do modal
        ├── menu.js           # menu hambúrguer e submenu (teclado e ARIA)
        └── acessibilidade.js # alto contraste e link "Ir para o conteúdo"
```

## Pré-requisitos

- Navegador atualizado (Chrome, Edge, Firefox ou Safari)
- [Git](https://git-scm.com/), para clonar o repositório
- [VS Code](https://code.visualstudio.com/) com a extensão Live Server, ou Python 3
- [Node.js](https://nodejs.org/) 20.19 ou mais novo, **apenas** para gerar o build de produção

## Como executar

O JavaScript usa módulos (`type="module"`), por isso o projeto **precisa ser aberto por um servidor**. Abrir o arquivo com dois cliques não funciona.

**Com o VS Code:**

1. Clone o repositório:
   ```bash
   git clone https://github.com/wsmoreira/ong-maos-solidarias.git
   ```
2. Abra a pasta no VS Code.
3. Instale a extensão **Live Server** (autor: Ritwick Dey).
4. Clique com o botão direito no `index.html` da raiz e escolha **Open with Live Server**.

**Com Python (alternativa):**

```bash
python -m http.server 5500
```

Depois, acesse `http://localhost:5500` no navegador.

## Build de produção

O build junta os módulos JavaScript em um único arquivo, minifica o CSS, o JavaScript e o HTML e gera a pasta `dist/`, pronta para publicar.

```bash
npm install        # instala o Vite (só na primeira vez)
npm run build      # gera a pasta dist/
npm run preview    # abre a versão de produção no navegador para conferir
```

O que a configuração (`vite.config.js`) faz:

- usa `html/index.html` e o `index.html` da raiz como pontos de entrada;
- usa caminhos relativos (`base: './'`), para funcionar no endereço do GitHub Pages;
- copia a pasta `imagens/` sem os `.png`, que o site não usa;
- minifica o HTML com o html-minifier-terser.

Resultado: o código passou de **67,3 KB para 37,4 KB (−44%)**. Com a compressão gzip do servidor, são transferidos cerca de **11,5 KB**. As pastas `dist/` e `node_modules/` não vão para o repositório (`.gitignore`).

## Testes

Os testes são manuais, feitos a cada nova funcionalidade:

- **HTML e CSS:** [W3C Validator](https://validator.w3.org/), sem erros.
- **Acessibilidade:** auditoria com axe-core (mesma base do Lighthouse), regras WCAG 2.1 A e AA, sem violações nas três páginas, no computador e no celular, nos modos normal e alto contraste.
- **Contraste:** todos os pares de cores acima de 4,5:1, calculados pela fórmula da WCAG (podem ser conferidos no [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)).
- **Teclado:** navegação completa com `Tab`, `Enter`, `Espaço` e `Esc`.
- **Formulário:** envio vazio, CPF inválido (`111.111.111-11`), CPF repetido, data no futuro, rascunho após recarregar a página e envio completo.
- **Falha da CDN:** com a Day.js bloqueada no DevTools (aba Network), o site continua funcionando.
- **Build:** a pasta `dist/` é testada com `npm run preview`, repetindo os testes acima.

## Como usar

- Use o menu para navegar entre **Início**, **Projetos** e **Cadastro**. O submenu de Projetos leva direto a cada seção.
- No cadastro, preencha todos os campos. Os erros aparecem ao sair de cada campo e no envio.
- CPFs válidos para teste: `529.982.247-25`, `123.456.789-09` e `987.654.321-00`.

**Dados salvos no navegador** (DevTools → Application → Local Storage):

| Chave | Conteúdo |
|---|---|
| `maos-solidarias:cadastros` | lista de cadastros enviados |
| `maos-solidarias:rascunho` | formulário em preenchimento |
| `maos-solidarias:alto-contraste` | preferência do modo de alto contraste |

Para zerar os testes, apague essas chaves.

## Acessibilidade

O projeto segue as diretrizes **WCAG 2.1, nível AA**.

- **Estrutura semântica:** landmarks `header`, `nav`, `main` e `footer`, um único `h1` e títulos em ordem.
- **Barra de acessibilidade** no topo, no padrão do eMAG:
  - **Ir para o conteúdo:** leva o foco direto ao conteúdo principal, sem passar pelo menu;
  - **Alto contraste:** fundo preto, texto branco e destaques em amarelo. A escolha fica salva, e o modo liga sozinho se o sistema operacional pedir mais contraste.
- **Teclado:** todos os elementos funcionam com `Tab`, `Enter` e `Esc`, com contorno de foco visível. O `Esc` fecha o menu, o submenu e o modal.
- **ARIA:**
  - `aria-expanded` no botão do menu;
  - `aria-pressed` no botão de contraste;
  - `aria-current` na página atual;
  - `aria-invalid` e `aria-describedby` nos campos do formulário;
  - `aria-live` nos avisos do formulário.
- **Formulário:** cada campo tem rótulo, e os erros aparecem em texto, não só pela cor.
- **Movimento:** as animações são desligadas quando o sistema pede menos movimento (`prefers-reduced-motion`).

## Manutenção

- **Novo projeto social:** acrescente um objeto na lista `projetos` do arquivo `js/modules/dados.js`. O card é gerado automaticamente.
- **Cores, fontes e espaçamentos:** altere as variáveis no início do `css/styles.css` (seletor `:root`).
- **Nova página:** crie a função de template em `templates.js` e registre a rota no objeto `rotas` do `router.js`.

## Fluxo de trabalho (GitFlow)

| Branch | Uso |
|---|---|
| `main` | versão publicada e estável |
| `develop` | integração das funcionalidades prontas |
| `feature/*` | uma branch para cada nova funcionalidade |
| `release/*` | preparação de uma nova versão |
| `hotfix/*` | correção urgente feita a partir da `main` |

As mensagens de commit seguem o padrão **Conventional Commits**:

- `feat:` nova funcionalidade
- `fix:` correção de erro
- `docs:` documentação
- `style:` ajustes visuais ou de formatação
- `refactor:` reorganização do código sem mudar o comportamento
- `chore:` tarefas de configuração

## Autor

**Wellington Moreira**, estudante de Análise e Desenvolvimento de Sistemas.
GitHub: [@wsmoreira](https://github.com/wsmoreira)
