const first_level_exp = 12;

function formula_level_exp(experience) {
    return Math.ceil(experience*1.05+5);
}

function total_exp_level(level)
{
    var next_level_exp = first_level_exp;
    var total_exp = first_level_exp;
    for(var i=1;i<level;++i)
    {
        next_level_exp = formula_level_exp(next_level_exp);
        total_exp+=next_level_exp;
    }
    return total_exp;
}

export function compute_next_level_exp(current_level)
{
    var next_level_exp = first_level_exp;
    for(var i=0;i<current_level;++i)
    {
        next_level_exp = formula_level_exp(next_level_exp);
    }
    return next_level_exp;
}

export function compute_current_level_exp(current_level, total_exp)
{
    return total_exp-total_exp_level(current_level);
}
