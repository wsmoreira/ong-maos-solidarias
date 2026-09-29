// =========================================================
// CONFIGURAÇÃO DO BUILD DE PRODUÇÃO (Vite)
// Comando: npm run build  ->  gera a pasta dist/
// =========================================================

import { defineConfig } from 'vite';
import { cpSync, readFileSync, writeFileSync } from 'node:fs';
import { minify } from 'html-minifier-terser';

// Copia a pasta imagens/ para dist/, porque os templates em JavaScript
// montam os caminhos das fotos em tempo de execução ('../imagens/...'),
// e o Vite só copia sozinho os arquivos que encontra no HTML e no CSS.
// Os .png ficam de fora: o site usa só .webp (com .jpg de reserva).
function copiarImagens() {
    return {
        name: 'copiar-imagens',
        closeBundle() {
            cpSync('imagens', 'dist/imagens', {
                recursive: true,
                filter: (caminho) => !caminho.endsWith('.png')
            });
        }
    };
}

// Minifica os arquivos HTML gerados (o Vite só minifica CSS e JavaScript)
function minificarHtml() {
    return {
        name: 'minificar-html',
        async closeBundle() {
            const arquivos = ['dist/index.html', 'dist/html/index.html'];

            for (const arquivo of arquivos) {
                const html = readFileSync(arquivo, 'utf-8');
                const minificado = await minify(html, {
                    collapseWhitespace: true,  // remove espaços e quebras de linha
                    removeComments: true,      // remove os comentários <!-- -->
                    minifyCSS: true,
                    minifyJS: true
                });
                writeFileSync(arquivo, minificado);
            }
        }
    };
}

export default defineConfig({
    // Caminhos relativos: o site funciona em qualquer pasta, inclusive
    // no endereço do GitHub Pages (/ong-maos-solidarias/)
    base: './',

    // A pasta "public" padrão do Vite não é usada neste projeto
    publicDir: false,

    build: {
        outDir: 'dist',
        emptyOutDir: true,
        // As duas páginas HTML do projeto são pontos de entrada do build
        rolldownOptions: {
            input: {
                redirecionamento: 'index.html',
                aplicacao: 'html/index.html'
            }
        }
    },

    plugins: [copiarImagens(), minificarHtml()]
});
