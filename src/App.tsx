import React, { useState, useEffect } from 'react';
import axios from "axios";
import { mapeamentoCETIC } from 'utils/mapping';
import { BarChart } from './components/Bar';
import { Button } from './components/Button'
import { Container, CategorySelection } from './global/styles';

function App() {
  const [dataset, setDataset] = useState<Object | null>(null);
  const [category, setCategory] = useState<Object | null>(null);
  const [year, setYear] = useState<Number>(2019);
  const [tableset, setTableset] = useState<String | null>(null);
  const [response, setResponse] = useState<Object | null>(null);
  const [categorySelection, setCategorySelection] = useState<any | null>(null);

  useEffect(() => {
    if(response){
      setDataset(response[year as keyof typeof dataset]);
      console.log('mudando para ano '+ year);
      if(tableset) {
        handleClick(mapeamentoCETIC[tableset as keyof typeof mapeamentoCETIC]);
      }
    } else {
      axios.get('http://localhost:5000/getAllData').then((response) => {
        console.log(response.data);
        setDataset(response.data[year as keyof typeof dataset]);
        setResponse(response.data);
      });
    }
  }, [year]);

  const clearTables = () => {
    setCategory(null);
  }

  const  handleClick = async (selectedTables:Array<typeof mapeamentoCETIC['Eixo Infraestrutura'][0]>) => {
    await clearTables();
    for(const key in selectedTables){
      let activeTables = {};
      const position = selectedTables[key]!.name.split('_');
      const chosenIndicators = selectedTables[key].indicators;
      const thisTable = dataset![position[0] as keyof typeof dataset][position[1]];
      if(!thisTable){
        console.log('Não possuímos a tabela '+position[1]);
      } else {
        activeTables = {
          table: thisTable,
          indicators: chosenIndicators
        }
        // eslint-disable-next-line no-loop-func
        setCategory(category => ({
          ...category,
          [key]: activeTables
        }));
      }
    }
  }
  return (
    <div >
      <Container>
        <h1>Mapeamento CETIC</h1>
        <button onClick={() => {setYear(2017)}}>2017</button>
        <button onClick={() => {setYear(2018)}}>2018</button>
        <button onClick={() => {setYear(2019)}}>2019</button>
        <CategorySelection>
          {Object.keys(mapeamentoCETIC).map((type: any) => (
            <Button display="round" onClick={() => {
              setCategorySelection(type);
              setTableset(type);
              handleClick(mapeamentoCETIC[type as keyof typeof mapeamentoCETIC]);
            }} 
            selected={categorySelection === type} 
            >
              {type}
            </Button>
          ))}
        </CategorySelection>
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
      </Container>
      
     
    </div>
  );
}

export default App;
