/* Computer Playing Logic */
function computerPlayer(level){
    if (level=="zombie"){
        zombie();
    }
    if (level=="learner"){
        learner();
    }
}

/* Zombie play:
    1. stops or wins when two consecutive cells are played in the winning set
    2. plays a random cell, in the absence of 1. */
function zombie() {
    for (let i = 0; i < win_set.length; i++) {
        if(($('.'+win_set[i][0]).hasClass(signs[0]) && $('.'+win_set[i][1]).hasClass(signs[0]) || 
            $('.'+win_set[i][0]).hasClass(signs[1]) && $('.'+win_set[i][1]).hasClass(signs[1])) &&
            !($('.'+win_set[i][2]).hasClass("fa"))){
            $('.'+win_set[i][2]).addClass("fa fa-2x " + signs[1]);
            return;
        }
    }
    var choose = $(".box:not(."+signs[0]+", ."+signs[1]+")");
    randChoice = choose[Math.floor(Math.random() * choose.length)];
    $(randChoice).addClass("fa fa-2x " + signs[1]);
}

// --------- Work in Progress ---------------------------
/* Learner play:
    1. stops win when two consecutive cells are played in the winning set
    2. plays a random cell, in the absence of 1. */
function learner() {

    for (let i = 0; i < win_set.length; i++) {
        if(($('.'+win_set[i][0]).hasClass(signs[0]) && $('.'+win_set[i][1]).hasClass(signs[0]) || 
            $('.'+win_set[i][0]).hasClass(signs[1]) && $('.'+win_set[i][1]).hasClass(signs[1])) &&
            !($('.'+win_set[i][2]).hasClass("fa"))){
            $('.'+win_set[i][2]).addClass(signs[1])
        }
    }
}
