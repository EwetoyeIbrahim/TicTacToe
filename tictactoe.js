/* Consecutive player Turns */
// Flag variable for checking Turn 
// We'll be modifying our base logic in the 
// next steps as per requirements     
var turn = 0; 
var players = ["First Player", "Second Player"]
var signs = ["fa-check", "fa-times"]

$(document).ready(function(){
    $("#screen").text(players[turn%2] + " Turn");
    $("button").click(function() { 
        if(!isInvalid($(this))){
            $(this).addClass("fa fa-2x " + signs[turn%2]);
            // Check if this move won
            if(check(signs[turn%2])){
                console.log(players[turn%2] + " Won")
                // GameOver disable all cells
                $.each($("button"), function() {
                    if(!$(this).hasClass("text-success")){
                        $(this).prop("disabled",true);
                    }
                });
            }else {
                // Turn to next player
                $("#screen").text(players[turn%2] + " Turn"); 
                turn += 1;
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
    if ($(".sq1").hasClass(symbol) &&  
        $(".sq2").hasClass(symbol) && 
        $(".sq3").hasClass(symbol)) 
    { 
        $(".sq1").addClass("text-success"); 
        $(".sq2").addClass("text-success"); 
        $(".sq3").addClass("text-success"); 
        return true; 
    } else if ($(".sq4").hasClass(symbol) 
            && $(".sq5").hasClass(symbol) 
            && $(".sq6").hasClass(symbol)) 
    { 
        $(".sq4").addClass("text-success"); 
        $(".sq5").addClass("text-success"); 
        $(".sq6").addClass("text-success"); 
        return true; 
    } else if ($(".sq7").hasClass(symbol) 
            && $(".sq8").hasClass(symbol) 
            && $(".sq9").hasClass(symbol)) 
    { 
        $(".sq7").addClass("text-success"); 
        $(".sq8").addClass("text-success"); 
        $(".sq9").addClass("text-success"); 
        return true; 
    } else if ($(".sq1").hasClass(symbol) 
            && $(".sq4").hasClass(symbol) 
            && $(".sq7").hasClass(symbol))  
    { 
        $(".sq1").addClass("text-success"); 
        $(".sq4").addClass("text-success"); 
        $(".sq7").addClass("text-success"); 
        return true; 
    } else if ($(".sq2").hasClass(symbol) 
            && $(".sq5").hasClass(symbol) 
            && $(".sq8").hasClass(symbol)) 
    { 
        $(".sq2").addClass("text-success"); 
        $(".sq5").addClass("text-success"); 
        $(".sq8").addClass("text-success"); 
        return true; 
    } else if ($(".sq3").hasClass(symbol) 
            && $(".sq6").hasClass(symbol) 
            && $(".sq9").hasClass(symbol))  
    { 
        $(".sq3").addClass("text-success"); 
        $(".sq6").addClass("text-success"); 
        $(".sq9").addClass("text-success"); 
        return true; 
    } else if ($(".sq1").hasClass(symbol) 
            && $(".sq5").hasClass(symbol) 
            && $(".sq9").hasClass(symbol))  
    { 
        $(".sq1").addClass("text-success"); 
        $(".sq5").addClass("text-success"); 
        $(".sq9").addClass("text-success"); 
        return true; 
    } else if ($(".sq3").hasClass(symbol) 
            && $(".sq5").hasClass(symbol) 
            && $(".sq7").hasClass(symbol))  
    { 
        $(".sq3").addClass("text-success"); 
        $(".sq5").addClass("text-success"); 
        $(".sq7").addClass("text-success"); 
        return true; 
    } else { 
        return false; 
    } 
}

/* Resetting the game */
function reset(){
    turn=0; 
    $("#screen").text(players[turn%2] + " Turn")
        .css("background-color", "transparent"); 
    $(".r").removeClass("fa fa-2x fa-check")
        .removeClass("fa fa-2x fa-times"); 
    

    // Enable all buttons
    $.each($("button"), function() {
        $(this).prop("disabled",false)
            .removeClass("text-success"); 
    });
} 