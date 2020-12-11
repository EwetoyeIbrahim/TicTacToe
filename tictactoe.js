/* Consecutive player Turns */
// Flag variable for checking Turn 
// We'll be modifying our base logic in the 
// next steps as per requirements     
var turn = 0; 
var players = ["First Player", "Second Player"];
var signs = ["fa-check", "fa-times"];
var win_set =  [[1,2,3],[1,4,7],
                [5,1,9], [5,2,8], [5,3,7], [5,4,6],
                [9,6,3], [9,8,7]];

/* Decides Win, Draw, Turn */
function referee() {
    // Check if the last move won
    if(check(signs[turn%2])){
        console.log(players[turn%2] + " Won")
        // GameOver disable all cells
        $.each($("button"), function() {
            if(!$(this).hasClass("text-success")){
                $(this).prop("disabled",true);
            }
        });
    }else {// Turn to next player
        turn += 1;
        $("#screen").text(players[turn%2] + " Turn");
    }
}

$(document).ready(function(){
    var level = "Zombie";
    if (level){
        players = ["Human "+level, "Computer "+level]
    }
    $("#screen").text(players[turn%2] + " Turn");
    $("button").click(function() { 
        if(!isInvalid($(this))){
            $(this).addClass("fa fa-2x " + signs[turn%2]);
            referee();            
            // Computer Play
            if(level && turn%2== 1){
                computerPlayer(level)
                referee();
            }
        }
    });
});

/* Script for checking any invalid moves */
function isInvalid(cell) {
    if(cell.hasClass("fa-times") || cell.hasClass("fa-check")){
        cell.addClass("bg-danger");
        setTimeout(() => { 
            cell.removeClass("bg-danger"); 
        }, 800);
        console.log("Invalid move")
        return true
    }
}

/* Function to check the winning move */
function check(symbol) {
    for (let i = 0; i < win_set.length; i++) {
        var count=0;
        for (let j = 0; j < 3; j++){
            if ($("table tr").children('td')
                .has("button."+symbol+"."+win_set[i][j]).length>0){
                    count+=1
            }
            if (count==3){
                for (let j = 0; j < 3; j++){
                    $("table tr").children('td').has("button."+symbol+"."+win_set[i][j])
                        .children('button').addClass("text-success");
                }
                return true;
            }
        }
    }
}

/* Resetting the game */
function reset(){
    turn = 0;
    $("#screen").text(players[turn%2] + " Turn");
    $(".box").removeClass("fa fa-2x fa-check")
        .removeClass("fa fa-2x fa-times"); 

    // Enable all buttons
    $.each($("button"), function() {
        $(this).prop("disabled",false)
            .removeClass("text-success"); 
    });
}

/* Computer Learner leavel logic */
function computerPlayer(level){
    if (level=="Zombie"){
        var choose = $(".box:not(.fa-check, .fa-times)");
        randChoice = choose[Math.floor(Math.random() * choose.length)];
        $(randChoice).addClass("fa fa-2x " + signs[turn%2]);
    }
}