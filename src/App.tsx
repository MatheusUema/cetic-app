import React, { useState, useEffect } from 'react';
import axios from "axios";
import { mapeamentoCETIC } from 'utils/mapping';
import { BarChart } from './components/Bar';

function App() {
  const [dataset, setDataset] = useState<Object | null>(null);
  const [table, setTable] = useState<Object | null>(null);
  const getData = () => {
    axios.get('http://localhost:5000/getAllData').then((response) => {
      console.log(response.data);
      setDataset(response.data);
    });
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <div >
      <h1>olá lindões</h1>
      <button onClick={() => {
        const teste = mapeamentoCETIC.escolha[0];
        let pos = teste.split('_');

        const table = dataset![pos[0] as keyof typeof dataset][pos[1]];
        setTable(table);
      }}>usando tabela G2B1</button>
      {table && 
      <BarChart table={table} />
      }
    </div>
  );
}

export default App;
