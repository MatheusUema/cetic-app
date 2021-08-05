console.log('oi')

if(typeof require !== 'undefined') XLSX = require('xlsx');
var wb = XLSX.readFile('../public/tic_educacao_2019/5. Tabelas de resultados/1. Português/1. Escolas urbanas/1. Alunos/tic_educacao_2019_escolas_urbanas_alunos_tabela_total_v1.0.xlsx');
/* DO SOMETHING WITH workbook HERE */
let data;
for(const sheetName in wb.SheetNames){
  const wsname = wb.SheetNames[sheetName];
  const ws = wb.Sheets[wsname];
  data = XLSX.utils.sheet_to_json(ws);
  console.log(data);
}