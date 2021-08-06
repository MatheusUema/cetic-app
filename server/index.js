const express = require('express');
const cors = require('cors')
const XLSX = require('xlsx');

const app = express();

const path = require('path');
const { capitalize } = require('lodash');

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
app.use(cors())
// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, "..", "build", "index.html"));
// });

const sheetsPaths = {
  2019: {
    escolasUrbanas: {
      alunos: '../public/tic_educacao_2019/5. Tabelas de resultados/1. Português/1. Escolas urbanas/1. Alunos/tic_educacao_2019_escolas_urbanas_alunos_tabela_total_v1.0.xlsx',
      coordenadores: '../public/tic_educacao_2019/5. Tabelas de resultados/1. Português/1. Escolas urbanas/2. Coordenadores/tic_educacao_2019_escolas_urbanas_coordenadores_tabela_total_v1.0.xlsx',
      diretores: '../public/tic_educacao_2019/5. Tabelas de resultados/1. Português/1. Escolas urbanas/3. Diretores/tic_educacao_2019_urbanas_diretores_tabela_total_v1.0.xlsx',
      professores: '../public/tic_educacao_2019/5. Tabelas de resultados/1. Português/1. Escolas urbanas/4. Professores/tic_educacao_2019_escolas_urbanas_professores_tabela_total_v1.0.xlsx',
      escolas: '../public/tic_educacao_2019/5. Tabelas de resultados/1. Português/1. Escolas urbanas/5. Escolas/tic_educacao_2019_escolas_urbanas_tabela_total_v1.0.xlsx'
    },
    escolasRurais: {
      escolas: '../public/tic_educacao_2019/5. Tabelas de resultados/1. Português/2. Escolas rurais/1. Escolas/tic_educacao_2019_escolas_rurais_tabela_total_v1.0.xlsx',
      diretores: '../public/tic_educacao_2019/5. Tabelas de resultados/1. Português/2. Escolas rurais/2. Diretores e responsáveis/tic_educacao_2019_escolas_rurais_responsaveis_tabela_total_v1.0.xlsx',
    }
  }
}

app.get('/getAllData', (req, res) => {
  let object = {};
  for(let year in sheetsPaths){
    for(let path in sheetsPaths[year]){
      const school = sheetsPaths[year][path];
      const schoolType = path;
      for(let subPath in school){
        const data = convertToJson(school[subPath]);
        const categoryName = schoolType+capitalize(subPath);
        object[categoryName] = data;
      }
    }
  }
  res.send(object);
});

const convertToJson = (path) => {
  let wb = XLSX.readFile(path);
  let data;
  let object = {};
  for(const sheetName in wb.SheetNames){
    const wsname = wb.SheetNames[sheetName];
    const ws = wb.Sheets[wsname];
    data = XLSX.utils.sheet_to_json(ws);

    const something = Object.keys(data[0]);
    object[something[0]] = data;
  }
  return object;
}

app.listen(5000, () => {
    console.log('server started on port 5000');
});