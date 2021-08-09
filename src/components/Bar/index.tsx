import React, { useState, useEffect, useCallback } from 'react';

// import { Container, ButtonTitle, LoadingIndicator } from './styles';
import { Bar } from 'react-chartjs-2';
import { capitalize, dataPercentage, uniqueVariables } from '../../utils/functions';
import { colors } from '../../utils/colors';

interface BarProps {
    table: any;
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
    const [dataset, setDataset] = useState<any | null>(null);
    const [labels, setLabels] = useState<Array<string> | null>(null);
    const [variable, setVariable] = useState<string>((uniqueVariables(Object.values(table.subcategories))[0]));

    const datasetCreation = useCallback((indicator:any) => {
      let dataset = [];
      let i = 0;
      setLabels(Object.keys(indicator));
      for(let category in table.categories.names){
        const data = dataPercentage(indicator, table.categories.names[category], variable);
        const obj = {
          label: table.categories.names[category],
          data: data,
            backgroundColor: [
                colors[i]
              ],
              borderColor: 'black',
              borderWidth: 1
        }
        dataset.push(obj);
        i++;
      }
      setDataset(dataset);
    }, [variable, table])
    
    useEffect(() => {
        datasetCreation(table.indicators['REGIÃO']);
    }, [datasetCreation, table]);

    const handleClick = (indicator:string) => {
      datasetCreation(table.indicators[indicator]);
    }

    const footer = (tooltipItems:any) => {
      let max = 0;
      let maxLabel;
      tooltipItems.forEach(function(tooltipItem: any) {
        if(max < tooltipItem.parsed.y) {
          max = tooltipItem.parsed.y;
          maxLabel = tooltipItem.dataset.label;
        }
      });
      return `Maior porcentagem em ${maxLabel}`;
    };

    return (
      <>
      <Bar
        width={100}
        height={50}
        options={{
          mainAspectRatio: false,
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              suggestedMax: 100
            },
          },
          plugins: {
            title: {
              display: true,
              text: table.title,
            },
            legend: {
              position: 'top',
            },
            subtitle: {
              display: true,
              position: 'bottom',
              text: 'gráficos dispostos em porcentagem (%)'
            },
            tooltip: {
              callbacks: {
                footer: footer,
              }
            }
          },
        }}
        data={{
        labels: labels,
        datasets: dataset,
        }}
      />
      {Object.keys(table.indicators).map((indicator: string, index:number) => {
        return (
          <>
          {(indicator !== 'FONTE' && indicator !== 'TOTAL') && 
          <button id={`${index}_${indicator}`} onClick={() => {
            handleClick(indicator);
          }}>
            {capitalize(indicator)}
         </button> }
          </>
        )
      })
      }
      <div>
        {uniqueVariables(Object.values(table.subcategories)).map((variable:string) => {
          return (
            <button key={variable} onClick={() => {setVariable(variable)}}>
              {variable}
            </button>
          )
        })
        }
      </div>
      
      </>
  );
};
