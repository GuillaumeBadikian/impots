const revenu = 38000 // - 3617.34
const revenu2 = 38000 - 5417.34
const RATE_2020 = [
    {
        max : 10064,
        rate : 0
    },
    {
        max : 25659,
        rate : .11
    },
    {
        max : 73369,
        rate : .30
    },
    {
        max : 157806,
        rate : .41
    },
    {
        max : Infinity,
        rate : .45
    }

]

function impots(revenu, rates = RATE_2020 ){
    imposition = new Array(rates.length).fill(0);
    tranche = 0
    for(let index = 0; index< rates.length && tranche!=revenu ;index++){
        const rate = rates[index];
        tranche = Math.min(rate.max, revenu)
        const imp = tranche - (rates[index-1] ? rates[index-1].max +1 : 0 )
        imposition[index] = imp * rate.rate;     
    }
    //console.log(imposition)
    console.log(imposition.reduce( (current, acc) => current + acc))

}
//revenu apres impots
function reversedImpots(revenu, rates = RATE_2020){
    imposition = new Array(rates.length).fill(0);
    tranche = 0
    for(let index = 0; index< rates.length && tranche!=revenu ;index++){
        const rate = rates[index];
        tranche = Math.min(rate.max, revenu)
        imp = 0
        if(tranche!= revenu)
            imp = tranche - (rates[index-1] ? rates[index-1].max + 1 : 0 )
        else {
            imp =(revenu-1-rates[index-1].max + imposition.reduce( (current, acc) => current + acc))/(1-rate.rate)
        }
        imposition[index] = imp * rate.rate;     
    }
    console.log(imposition.reduce( (current, acc) => current + acc))
    console.log(imposition)
}
impots(revenu)
reversedImpots(revenu2)