// =========================================================
// DADOS DA APLICAÇÃO
// Ficam separados dos templates: para incluir um projeto novo,
// basta acrescentar um objeto na lista, sem mexer no HTML.
// =========================================================

export const projetos = [
    {
        titulo: 'Reforço Escolar',
        categoria: 'Educação',
        status: { texto: 'Vagas abertas', tipo: 'sucesso' },
        descricao: 'Aulas gratuitas de português e matemática para crianças do ensino fundamental.',
        imagem: null
    },
    {
        titulo: 'Cozinha Comunitária',
        categoria: 'Alimentação',
        status: { texto: 'Precisa de doações', tipo: 'erro' },
        descricao: 'Preparo e distribuição de refeições para famílias da região.',
        imagem: {
            arquivo: 'cozinha-comunitaria',
            alt: 'Voluntários conferindo caixas com frutas, verduras e alimentos para doação',
            largura: 400,
            altura: 600
        }
    },
    {
        titulo: 'Capacitação Profissional',
        categoria: 'Trabalho e renda',
        status: { texto: 'Em breve', tipo: 'aviso' },
        descricao: 'Cursos de informática básica e atendimento ao público para jovens e adultos.',
        imagem: null
    }
];

export const estados = [
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' }
];
