import React, { useState, useEffect, useCallback } from 'react';
// import { Container, ButtonTitle, LoadingIndicator } from './styles';
import { Bar } from 'react-chartjs-2';
import { Title, Container, DataContainer, DataOrganizer } from './styles';
import { capitalize, dataPercentage, uniqueVariables, selectIndicators } from '../../utils/functions';
// import { colors } from '../../utils/colors';

interface BarProps {
    table: any;
    chosenIndicators: Array<string>;
    colors: Array<String>;
}


export const BarChart = ({
    table, chosenIndicators, colors
     }: BarProps): JSX.Element => {
    const [dataset, setDataset] = useState<any | null>(null);
    const [labels, setLabels] = useState<Array<string> | null>(null);
    const [variable, setVariable] = useState<string>(table.subcategories ? (uniqueVariables(Object.values(table.subcategories))[0]) : '');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [stacked, setStacked] = useState<boolean>(!table.categories.subcategories);
    const [buttonIndicators, setButtonIndicators] = useState<Array<string>>(['']);
    const [shownIndicator, setShownIndicator] = useState<String>('REGIÃO');

    const datasetCreation = useCallback((indicator:any) => {
      let dataset = [];
      let i = 0;
      setLabels(Object.keys(indicator));
      for(let category in table.categories.names){
        const data = table.categories.subcategories ? dataPercentage(indicator, table.categories.names[category], variable) : dataPercentage(indicator, table.categories.names[category]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variable, table])
    
    useEffect(() => {
        datasetCreation(table.indicators[shownIndicator as keyof typeof table.indicators]);
        setButtonIndicators(chosenIndicators[0] ? chosenIndicators : selectIndicators(Object.keys(table.indicators)));
    }, [shownIndicator, datasetCreation, table, chosenIndicators]);

    const handleClick = (indicator:string) => {
      setShownIndicator(indicator);
      // datasetCreation(table.indicators[indicator]);
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
      <Container>
        <Title>{table.title}</Title>
        <DataContainer>
          <Bar
            options={{
              maintainAspectRatio: true,
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                  stacked: stacked,
                },
                x: {
                  stacked: stacked,
                }
              },
              plugins: {
                legend: {
                  position: 'top',
                  align: 'start',
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
          <DataOrganizer>
            <p>Visualizar por:</p>
            {Object.keys(table.indicators).map((indicator: string) => {
              return (
                <>
                {buttonIndicators.includes(indicator) && 
                <button key={indicator} onClick={() => {
                  handleClick(indicator);
                }}>
                  {capitalize(indicator)}
                </button> }
                </>
              )
            })
            }
          </DataOrganizer>
          {table.categories.subcategories &&
          <DataOrganizer>
            <p>Porcentagem da variável:</p>
            
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
          </DataOrganizer>
          }
        </DataContainer>

      
      </Container>
    </>
  );
};
