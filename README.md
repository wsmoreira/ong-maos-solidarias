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
- **Acessibilidade:** navegação por teclado, foco visível, contraste adequado e atributos ARIA.

## Tecnologias

- HTML5 semântico
- CSS3 (variáveis, Grid, Flexbox e media queries)
- JavaScript (ES6 Modules), sem frameworks
- [Day.js](https://day.js.org/) 1.11.13, carregada pela CDN jsDelivr

## Estrutura de pastas

```
ong/
├── index.html            # redireciona para html/index.html
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
        └── menu.js           # fechamento do menu com Esc
```

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

## Como usar

- Use o menu para navegar entre **Início**, **Projetos** e **Cadastro**. O submenu de Projetos leva direto a cada seção.
- No cadastro, preencha todos os campos. Os erros aparecem ao sair de cada campo e no envio.
- CPFs válidos para teste: `529.982.247-25`, `123.456.789-09` e `987.654.321-00`.

**Dados salvos no navegador** (DevTools → Application → Local Storage):

| Chave | Conteúdo |
|---|---|
| `maos-solidarias:cadastros` | lista de cadastros enviados |
| `maos-solidarias:rascunho` | formulário em preenchimento |

Para zerar os testes, apague essas chaves.

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
