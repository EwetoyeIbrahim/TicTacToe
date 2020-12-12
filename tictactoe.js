// Global declarations   
var turn = 0; // playing turn
const signs = ["fa-check", "fa-times"];
const levels = ["human vs human", "zombie", "expert"];
var level = $("select").val();; // default level/mode of place
var players = ["Human("+level+")", "Computer("+level+")"]; // default player names
const win_set =  [[1,2,3],[1,4,7],
                [5,1,9], [5,2,8], [5,3,7], [5,4,6],
                [9,6,3], [9,8,7]];

// default first player announcement
$("#screen").text(players[turn%2] + " turn");

/* Play your selected button:
    1. the button must have not been played
    2. the referee decides if the move wins, drwas or game-on
    3. depending on the mode/level the next player is called to play */
$("button").click(function() { 
    if(!isInvalid($(this))){
        $(this).addClass("fa fa-2x " + signs[turn%2]);
        referee();            
        // Next player
        if (level==levels[0]) return true;
        if(turn%2== 1){
            computerPlayer(level);
            referee();
        }
    }
});

/* Selection of level/mode:
    Upon selection, game resets; level is set; and players are renamed */
$("select").change(function(){
    reset();
    level = $("select").val();
    if (level==levels[0]) {
        players = ["Player 1", "Player 2"];
    } else {
        players = ["Human("+level+")", "Computer("+level+")"];
    }
    $("#screen").text(players[turn%2] + " turn"); // default first player announcement
});

/* Script for checking any invalid moves:
    For a move to be valid, it must have not been previously occupied */
function isInvalid(cell) {
    if(cell.hasClass(signs[0]) || cell.hasClass(signs[1])){
        cell.addClass("bg-danger");
        setTimeout(() => { 
            cell.removeClass("bg-danger"); 
        }, 800);
        console.log("Invalid move")
        return true
    }
}

/* Referee:
    Decides Win, Draw, Turn */
function referee() {
    // Check if the last move won
    if(checkWin(signs[turn%2])){
        console.log(players[turn%2] + " Won")
        // GameOver disable all cells
        $.each($("button"), function() {
            if(!$(this).hasClass("text-success")){
                $(this).prop("disabled",true);
            }
        });
    }else {// Turn to next player
        turn += 1;
        $("#screen").text(players[turn%2] + " turn");
    }
}

/* Check if the game has been won:
    1. All the table butons are compared against the declared winning set*/
function checkWin(symbol) {
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

/* Reset, this should be equivalent to refreshing the browser:
    1. Turns are started a-fresh
    2. All play symbols are removed
    3. All buttons are enabled */
function reset(){
    turn = 0;
    $("#screen").text(players[turn%2] + " turn");
    $(".box").removeClass("fa fa-2x "+signs[0])
        .removeClass("fa fa-2x "+signs[1]);
    $.each($("button"), function() {
        $(this).prop("disabled",false)
            .removeClass("text-success"); 
    });
}
