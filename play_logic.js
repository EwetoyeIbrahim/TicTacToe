/* Computer Playing Logic */
function computerPlayer(level){
    if (level=="Sergeant"){
        sergeant();
    }
    if (level=="Captain"){
        captain();
    }
}

/* Sergeant play:
    1. stops or wins when two consecutive cells are played in the winning set
    2. plays a random cell, in the absence of 1. */
function sergeant() {
    for (let i = 0; i < win_set.length; i++) {
        if(($('.'+win_set[i][0]).hasClass(signs[0]) && $('.'+win_set[i][1]).hasClass(signs[0]) || 
            $('.'+win_set[i][0]).hasClass(signs[1]) && $('.'+win_set[i][1]).hasClass(signs[1])) &&
            !($('.'+win_set[i][2]).hasClass("fa"))){
            $('.'+win_set[i][2]).addClass("fa fa-2x " + signs[1]);
            return;
        };
    };
    random_play();
}

/* Captain play:
    1. stops win when two consecutive cells are played in the winning set
    2. plays a random cell, in the absence of 1. */
function captain() {
    // See if the computer has a winning move at stake
    if (checks(signs[1])) return;
    // try blocking the player from winning
    if (checks(signs[0])) return;
    // try fixing into one of the corners
    if ($(".box:not(.fa,.2,.4,.6,.8)").length > 0) {
        var corners = $(".box:not(.fa,.2,.4,.6,.8)");
        rand_corner = corners[Math.floor(Math.random() * corners.length)];
        $(rand_corner).addClass("fa fa-2x " + signs[1]);
        return;
    };
    // play an available box at random
    random_play();
}

// play any available box at random
let random_play = () => {
    var choose = $(".box:not(.fa)");
    rand_choice = choose[Math.floor(Math.random() * choose.length)];
    $(rand_choice).addClass("fa fa-2x " + signs[1]);
};

// check if the ginven mark is going to win on next play
var check_seq = [[1,2],[0,2],[0,1]]; // search sequence
function checks(mark) {
    for (let i = 0; i < win_set.length; i++) {
        for (let j = 0; j < check_seq.length; j++) {
            if (($('.' + win_set[i][check_seq[j][0]]).hasClass(mark) && $('.' + win_set[i][check_seq[j][1]]).hasClass(mark)) &&
                !($('.' + win_set[i][j]).hasClass("fa"))) {
                $('.' + win_set[i][j]).addClass("fa fa-2x " + signs[1]);
                return true;
            };
        };
    };
}

