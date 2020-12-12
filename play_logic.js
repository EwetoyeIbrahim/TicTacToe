/* Computer Playing Logic */
function computerPlayer(level){
    if (level=="zombie"){
        zombie();
    }
}

function zombie() {
    var choose = $(".box:not(."+signs[0]+", ."+signs[1]+")");
    randChoice = choose[Math.floor(Math.random() * choose.length)];
    $(randChoice).addClass("fa fa-2x " + signs[turn%2]);
}