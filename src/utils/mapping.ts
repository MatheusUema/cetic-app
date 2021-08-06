export const mapeamentoCETIC = {
    escolha: [
        'escolasUrbanasProfessores_G2B1',
        'escolasUrbanasProfessores_G1',
        'escolasUrbanasProfessores_G2',
        'escolasUrbanasProfessores_G8A',
        'escolasUrbanasCoordenadores_C7A',
        'escolasUrbanasCoordenadores_C3'
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