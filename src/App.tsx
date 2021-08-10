import React, { useState, useEffect } from 'react';
import axios from "axios";
import { mapeamentoCETIC } from 'utils/mapping';
import { BarChart } from './components/Bar';

function App() {
  const [dataset, setDataset] = useState<Object | null>(null);
  const [table, setTable] = useState<Object | null>(null);
  const [category, setCategory] = useState<Object | null>(null);
  const [chosenIndicators, setChosenIndicators] = useState<Array<string>>(['']);
  const getData = () => {
    axios.get('http://localhost:5000/getAllData').then((response) => {
      console.log(response.data);
      setDataset(response.data);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  const handleClick = (selectedTables:Array<typeof mapeamentoCETIC.escolha[0]>) => {
    for(const key in selectedTables){
      let activeTables = {};
      const position = selectedTables[key]!.name.split('_');
      const chosenIndicators = selectedTables[key].indicators;
      const thisTable = dataset![position[0] as keyof typeof dataset][position[1]];
      activeTables = {
        table: thisTable,
        indicators: chosenIndicators
      }
      // eslint-disable-next-line no-loop-func
      setCategory(category => ({
        ...category,
        [key]: activeTables
      }))
    }
  }
  return (
    <div >
      <h1>Mapeamento CETIC</h1>
      <button onClick={() => {
        const teste = mapeamentoCETIC.escolha[0];
        let pos = teste.name.split('_');
        const chosenIndicators = teste.indicators;

        const table = dataset![pos[0] as keyof typeof dataset][pos[1]];
        setTable(table);
        setChosenIndicators(chosenIndicators);
        handleClick(mapeamentoCETIC.escolha);
      }}>Escolha</button>
      {category && 
      Object.keys(category).map((key: string) => {
        const selected = category[key as keyof typeof category];
        const selectedKeys = Object.keys(selected)
        const table = selected[selectedKeys[0] as keyof typeof selected]
        const chosenIndicators = selected[selectedKeys[1] as keyof typeof selected]
        return (
          <BarChart table={table} chosenIndicators={chosenIndicators} />
        )
      })
      }
    </div>
  );
}

export default App;
