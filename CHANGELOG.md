# Histórico de versões

Este projeto segue o [Versionamento Semântico](https://semver.org/lang/pt-BR/) (MAJOR.MINOR.PATCH).

## [1.0.0] - 2026-09-29

Primeira versão publicada em produção.

### Adicionado
- Barra de acessibilidade com link "Ir para o conteúdo" e modo de alto contraste.
- Menu hambúrguer como botão com `aria-expanded`; `Esc` fecha menu, submenu e modal.
- Build de produção com Vite: CSS, JavaScript e HTML minificados.
- Deploy automático no GitHub Pages com GitHub Actions.
- README com instalação, uso, build, testes, acessibilidade e fluxo de trabalho.
- Máscaras de CPF, telefone e CEP, validação com mensagens por campo e conferência do CPF.
- Armazenamento de cadastros e rascunho no `localStorage`.
- Integração com a biblioteca Day.js.

### Alterado
- Arquivos do projeto movidos da pasta `ong/` para a raiz do repositório.

## [0.3.0]

- Site transformado em SPA, com rotas por hash e templates em JavaScript.

## [0.2.0]

- CSS com design system, grid de 12 colunas, 5 breakpoints, menu responsivo e componentes de feedback.

## [0.1.0]

- Estrutura em HTML5 semântico: páginas inicial, de projetos e de cadastro, com formulário e validação nativa.
