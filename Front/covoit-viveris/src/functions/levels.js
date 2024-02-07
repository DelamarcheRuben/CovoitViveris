const FIRST_LEVEL_EXP = 12;


function formula_level_exp(experience) {
    return Math.ceil(experience*1.05+5);
}

//total de l'xp obtenu au début du niveau
function total_exp_level(level)
{
    var next_level_exp = FIRST_LEVEL_EXP;
    var total_exp = FIRST_LEVEL_EXP;
    for(var i=1;i<level;++i)
    {
        next_level_exp = formula_level_exp(next_level_exp);
        total_exp+=next_level_exp;
    }
    return total_exp;
}

// Retourne l'expérience du level l
export function level_experience(level){
    return total_exp_level(level)-total_exp_level(level-1);
}

// Retourne l'expérience gagné grâce à un trajet
export function calculate_experience_carShare(nb_people, bonus_streak, bonus_pollution, bonus_day){
    return Math.ceil((10+2*nb_people) * bonus_streak * bonus_pollution * bonus_day); 
}

// Retourne le nombre de level gagné avec le trajet
export function level_up(level, exp_user, exp_car_share, nb_level){
    if(exp_user + exp_car_share < level_experience(level)){
        return nb_level;
    }
    else{
        return level_up(level+1, 0, exp_car_share - (level_experience(level) - exp_user), nb_level+1);
    }
}

// Retourne l'expérience de l'user à la fin du trajet dans son nouveau level
export function experience_user_end_carShare(level, exp_user, exp_car_share){
    if(exp_user + exp_car_share < level_experience(level)){
        return exp_car_share;
    }
    else{
        return experience_user_end_carShare(level+1, 0, exp_car_share - (level_experience(level) - exp_user));
    }
}

// Retourne vrai si l'utilisateur augmente de level et faux sinon
export function increase_level(level, exp_user, exp_car_share){
    if(exp_user + exp_car_share < level_experience(level)){
        return false;
    }
    else{
        return true;
    }
}