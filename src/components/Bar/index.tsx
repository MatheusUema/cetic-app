import React, { useState, useEffect } from 'react';

// import { Container, ButtonTitle, LoadingIndicator } from './styles';
import { Bar } from 'react-chartjs-2';

// interface BarProps {
//   children: React.ReactNode;
//   onClick?: () => void;
//   display?: 'full' | 'round' | 'small' | 'text';
//   color?: string;
//   loading?: boolean;
//   fontColor?: string;
//   className?: string
// }

interface BarProps {
    table: object;
}

/**
 * Principais botões
 *  - 'title': Título
 *  - 'display': Tipo do botão utilizado
 *  - 'onPress': Função realizada ao pressionar o botão
 *  - 'loading': Altera o texto para a animação de carregamento
 *  - 'color': Cor de fundo
 *  - 'fontColor': Cor da fonte do título do botão
 */

export const BarChart = ({
//   children, onClick, display = 'round', loading, color, fontColor, disabled, className, ...rest
    table
     }: BarProps): JSX.Element => {
    const [title, setTitle] = useState<String | null>(null);
    const [categories, setCategories] = useState<any | null>(null);
    const [dataset, setDataset] = useState<any | null>(null);
    const [labels, setLabels] = useState<Array<string> | null>(['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']);
    

    useEffect(() => {
        const teste = Object.values(table);
        console.log(teste)
        const categories = Object.values(teste[1]);
        categories.shift();
        setCategories(categories);
        console.log(categories)
        datasetCreation(categories);
        const variables = Object.values(teste[2]);
        console.log(variables);
        setTitle(Object.keys(teste[0])[0]);





    }, [table]);


    const datasetCreation = (categories: any) => {
      let dataset = [];
      for(let category in categories){
        const obj = {
          label: categories[category],
          data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
        }
        dataset.push(obj);
      }
      setDataset(dataset);
    }

    return (
      <>
      <p>{title}</p>
      <Bar
        width={100}
        height={50}
        options={{matinAspectRatio: false}}
        data={{
        labels: labels,
        datasets: dataset
        }}
      />
      <button onClick={() => {
        setLabels(['norte', 'sul', 'centro-oeste', 'seila', 'isso ai'])
      }}>alter labels</button> 
      </>
  );
};
