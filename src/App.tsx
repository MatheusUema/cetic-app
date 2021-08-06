import React, { useState, useEffect } from 'react';
import axios from "axios";
import { mapeamentoCETIC } from 'utils/mapping';

function App() {
  const [dataset, setDataset] = useState<Object | null>(null);
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
      <button>ir para escolha</button>
    </div>
  );
}

export default App;
