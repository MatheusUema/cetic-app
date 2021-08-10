export const mapeamentoCETIC = {
    escolha: [
        {
            name: 'escolasUrbanasProfessores_G2B1',
            indicators: ['SEXO', 'FAIXA ETÁRIA', 'REGIÃO']
        },
        {
            name: 'escolasUrbanasProfessores_G2',
            indicators: ['SEXO', 'FAIXA ETÁRIA', 'REGIÃO']
        },
        {
            name: 'escolasUrbanasProfessores_G8A',
            indicators: ['SEXO', 'FAIXA ETÁRIA', 'REGIÃO']
        },
        {
            name: 'escolasUrbanasCoordenadores_C7A',
            indicators: ['SEXO', 'FAIXA ETÁRIA', 'REGIÃO']
        },
        {
            name: 'escolasUrbanasCoordenadores_C3',
            indicators: ['SEXO', 'FAIXA ETÁRIA', 'REGIÃO']
        }
    ]
}

const categories = {
    urbanas: ['escolas', 'alunos', 'professores', 'diretores', 'coordenadores'],
    rurais: ['alunos', 'diretores'] //tem que ver isso aqui
}

export const findTable = (category: string):void => {
    

    //retorna local da tabela
    console.log(category);
}