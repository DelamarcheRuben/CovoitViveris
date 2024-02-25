//https://carlabelling.ademe.fr/chiffrescles/r/evolutionTauxCo2

const DIESEL_CONS = 130;//g/km
const ESSENCE_CONS = 131;//g/km

export const type = [
    {id:0,cons:135,name:"Citadine - Essence"},
    {id:1,cons:115,name:"Citadine - Diesel"},
    {id:2,cons:160,name:"Familiale - Essence"},
    {id:3,cons:140,name:"Familiale - Diesel"},
    {id:4,cons:210,name:"Sportive - Essence"},
    {id:5,cons:190,name:"Sportive - Diesel"},
    {id:6,cons:50,name:"Electrique/Hybride"}
]


export function calcul_economy(distance, nb_passengers, cartype)
{
    var cons;
    type.forEach(element => {
        if(element.id === cartype) cons = element.cons;
    });
    console.log(distance, cons, nb_passengers, cartype);
    return distance*cons*nb_passengers;
}
