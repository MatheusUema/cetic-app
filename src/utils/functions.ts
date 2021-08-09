export const capitalize = (string:string):string => {
    const lower = string.toLowerCase().slice(1);
    const upper = string.charAt(0).toUpperCase();
    return upper+lower;
}

interface quantityObject {
    [key: string]: number;
}

export const dataPercentage = (indicator:any, category:string, percentageString:string):Array<number> => {
    //Por enquanto criada para uma tabela com subcategorias para retornar apenas a porcentagem de sim
    let data = [];
    let quantityData: quantityObject = {}
    for(const key in indicator){
        let total = 0;
        let comparative = 0;
        const categoryValues = indicator[key][category];
        for(const value in categoryValues){
            if(value === percentageString) comparative = categoryValues[value];
            total += categoryValues[value];
        }
        const value = parseFloat((100*comparative/total).toFixed(2))
        data.push(value);
        quantityData[key] = parseFloat((100*comparative/total).toFixed(2));
    }
    return data;
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