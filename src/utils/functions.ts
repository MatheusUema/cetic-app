export const capitalize = (string:string):string => {
    const lower = string.toLowerCase().slice(1);
    const upper = string.charAt(0).toUpperCase();
    return upper+lower;
}

interface quantityObject {
    [key: string]: number;
}

export const dataPercentage = (indicator:any, category:string, percentageString:string = ''):Array<number> => {
    //Por enquanto criada para uma tabela com subcategorias para retornar apenas a porcentagem de sim
    let data = [];
    let quantityData: quantityObject = {}
    for(const key in indicator){
        let total = 0;
        let comparative = 0;
        let categoryValues = indicator[key];
        let selectedCategory = category;

        if(!percentageString){
            categoryValues = indicator[key];
            selectedCategory = category;
        } else {
            categoryValues = indicator[key][category];
            selectedCategory = percentageString;
        }
        for(const value in categoryValues){
            if(value === selectedCategory) comparative = categoryValues[value];
            total += categoryValues[value];

            if(Object.keys(categoryValues).length === 1){
                const firstKey =  Object.keys(indicator[key])[0];
                const comparativeObject = indicator[key][firstKey];
                total = 0;
                // console.log(indicator[key][firstKey])
                for(let keys in comparativeObject){
                    total += comparativeObject[keys];
                    // console.log(comparativeObject[keys])
                }
                // console.log(total);
            }
        }
        const value = parseFloat((100*comparative/total).toFixed(2))
        data.push(value);
        quantityData[key] = parseFloat((100*comparative/total).toFixed(2));
    }
    return data;
    // return [2,2,4,2,5,2,4,2]
}

;

export const uniqueVariables = (variables:Array<string>):Array<string> => {
    let uniqueArray = [];
    for(let i = 0; i < variables.length; i++){
        if(uniqueArray.indexOf(variables[i]) === -1){
            uniqueArray.push(variables[i]);
        }
    }
    return uniqueArray;
}

export const selectIndicators = (chosenIndicators:Array<string>):Array<string> => {
    let newIndicators = [];
    for(let i = 0; i < chosenIndicators.length; i++){
        if(chosenIndicators[i] !== 'TOTAL' && chosenIndicators[i] !== 'FONTE'){
            newIndicators.push(chosenIndicators[i]);
        }
    }
    return newIndicators;
}