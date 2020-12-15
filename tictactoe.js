// Global declarations   
var turn = 0; // playing turn
var score_set =[0, 0];
const signs = ["fa-circle", "fa-times"];
var level = $("select").val();; // default level/mode of place
var players = ["You", "Computer"]; // default player names
const win_set =  [[1,2,3],[1,4,7],
                [5,1,9], [5,2,8], [5,3,7], [5,4,6],
                [9,6,3], [9,8,7]];

// default first player announcement
$("#screen").text(players[turn%2] + " play first");

/* Selection of level/mode:
    Upon selection, game resets; level is set; and players are renamed */
$("select").change(function(){
    reset();
    level = $("select").val();
    if (level=="Human") {
        players = ["Player 1", "Player 2"];
    } else {
        players = ["You", "Computer"];
    }
    $("#screen").text(players[turn%2] + " playing..."); // default first player announcement
    $(".player1").text(players[0]);
    $(".player2").text(players[1]);
});

/* Play your selected button:
    1. the button must have not been played
    2. the referee decides after a box has been played.
    3. let computer play its turn, if required*/
$(".box").click(function() { 
    if(!isInvalid($(this))){
        $(this).addClass("fa fa-2x " + signs[turn%2]);
        referee();
        shouldComputerPlay();
    }
});

/* Trigger computer when required to play
    1. play when not in human mode or turn
    2. inform the referee */
function shouldComputerPlay() {
    if (level !== "Human" && turn%2== 1){
        $("#screen").text(players[turn%2] + " playing...");
        $.when( computerPlayer(level) ).done(function() {
            referee();;
        });
    };
}

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
    var result_cap;
    // Look for draw first
    if ($("td").has("button.fa").length > 8) {
        result_cap = "Draw";
    }
    // Check if the last move won
    if(checkWin(signs[turn%2])){
        result_cap = players[turn%2] + " won this set";
        score();
    }
    // Announce result or game-on
    if (typeof result_cap !== 'undefined') {
        $(".result_cap").text(result_cap);
        $(".modal-title").text(level + " Mode");
        // GameOver disable all cells
        $.each($("button"), function() {
            if(!$(this).hasClass("text-success")){
                $(this).prop("disabled",true);
            }
        });
        $('#scoreModal').modal('show');
    } else {
        // No win or draw, game on!!!
        turn += 1;
        $("#screen").text(players[turn%2] + " playing...");
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
                    count += 1
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

/* Scoring wins:
    The winning turn previous score is increased by 1 */
function score() {
    $(".score" + (turn%2+1))
        .text(score_set[turn%2]+=1);
}

/* Continue playing after declaration of last set:
    1. All play symbols are removed
    2. All buttons are enabled
    3. The starting player is announced*/
function continue_play() {
    $(".box").removeClass("fa fa-2x "+signs[0])
        .removeClass("fa fa-2x "+signs[1]);
    $.each($("button"), function() {
        $(this).prop("disabled",false)
            .removeClass("text-success");
    });
    
    // We have to allow computer play, if it will be starting next turn
    if (turn!=0){
        turn += 1;
        shouldComputerPlay();
    }
    $("#screen").text(players[turn%2] + " playing...");
    
}

/* After the score card has been hidden, let the player choose to continue playing */
$("#scoreModal").on("hidden.bs.modal", function() {
    $("#screen").html(
        "<button class='btn btn-md btn-primary' onclick='continue_play()'>continue</button>");
})

/* Reset, this should be equivalent to refreshing the browser:
    1. Turn and score are refreshed
    2. All continue_play() are efected */
function reset(){
    turn = 0;
    score_set = [0, 0];
    $(".score1").text(score_set[0]);
    $(".score2").text(score_set[1]);
    continue_play();
}


