import React, { useState } from 'react';

import * as XLSX from 'xlsx';

function App() {
  const teste = () => {
    fetch('https://api.apispreadsheets.com/data/16554/').then(res => {
      if(res.status === 200){
        res.json().then(data => {
          console.log(data);
        }).catch(err => console.log('erro'));
      } else {
        console.log('veio nada')
      }
    }).catch(err => console.log('err'));
  }
  const readExcel = (file: any) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target!.result;

        const wb = XLSX.read(bufferArray, {type: "buffer"});
        // console.log(wb.SheetNames)
        let data;
        for(const sheetName in wb.SheetNames){

          const wsname = wb.SheetNames[sheetName];
          const ws = wb.Sheets[wsname];
          data = XLSX.utils.sheet_to_json(ws);
          console.log(data);
        }

        // const wsname = wb.SheetNames[0];
        // // console.log(wsname);

        // const ws = wb.Sheets[wsname];

        // const data = XLSX.utils.sheet_to_json(ws);
        // console.log(data);

        resolve(data);
      };
      fileReader.onerror = error => {
        reject(error);
      };
    });
  };

  return (
    <div >
      <input type="file" onChange={(e) =>{
        const file = e.target.files![0];
        readExcel(file);
      }} />
      <button onClick={()=>{teste()}}>aa iai</button>
    </div>
  );
}

export default App;
