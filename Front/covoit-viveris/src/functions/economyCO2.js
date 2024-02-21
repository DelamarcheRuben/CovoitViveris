//https://carlabelling.ademe.fr/chiffrescles/r/evolutionTauxCo2

const DIESEL_CONS = 130;//g/km
const ESSENCE_CONS = 131;//g/km

const type = {
    diesel:0,
    essence:1,
    electric:2
}


export function calcul_economy(distance, nb_passengers, type)
{
    var cons;
    switch (type) {
        case 0: cons = DIESEL_CONS;break;
        case 1: cons = ESSENCE_CONS;break;
        case 2: cons = ESSENCE_CONS;break;
        default: cons = ESSENCE_CONS;break;
    }
    return distance*cons*nb_passengers;
}
