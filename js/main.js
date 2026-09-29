// =========================================================
// PONTO DE ENTRADA DA APLICAÇÃO
// Importa os módulos e liga cada funcionalidade.
// =========================================================

import { iniciarRotas } from './modules/router.js';
import { iniciarModais } from './modules/modal.js';
import { iniciarFormulario } from './modules/formulario.js';
import { iniciarMenu } from './modules/menu.js';
import { iniciarAcessibilidade } from './modules/acessibilidade.js';
import { carregarBibliotecaDatas } from './modules/datas.js';

iniciarRotas();
iniciarModais();
iniciarFormulario();
iniciarMenu();
iniciarAcessibilidade();

// Biblioteca externa: carrega em segundo plano, sem travar o resto do site
carregarBibliotecaDatas();
