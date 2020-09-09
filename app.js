
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
    //console.log(imposition.reduce( (current, acc) => current + acc))
    return imposition

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
    //console.log(imposition.reduce( (current, acc) => current + acc))
    //console.log(imposition)
    return imposition
}


const before = document.getElementById("ImpotsB")
const after = document.getElementById("ImpotsA")
const impot = document.getElementById("Impots")


before.addEventListener("change", (e) => {
    const n = Number.parseFloat(before.value)
    if(!isNaN(n)){
        const impots1 = impots(before.value)
        after.value = n - impots1.reduce( (current, acc) => current + acc)
        impot.value = impots1.reduce( (current, acc) => current + acc)

    }
})

after.addEventListener("change", (e) =>{
    const n = Number.parseFloat(after.value)
    if(!isNaN(n)){
        const impots1 = reversedImpots(after.value)
        before.value = n + impots1.reduce( (current, acc) => current + acc)
        impot.value = impots1.reduce( (current, acc) => current + acc)
    }
} )

//const impots1 = impots(revenu)
//const impots2 = reversedImpots(revenu2)