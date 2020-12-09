/* Consecutive player Turns */
// Flag variable for checking Turn 
// We'll be modifying our base logic in the 
// next steps as per requirements     
var turn = 1; 
var players = ["First Player", "Second Player"]
var signs = ["fa-check", "fa-times"]
$("button").click(function() { 
    if(!isInvalid($(this))){
        $(this).addClass("fa fa-2x " + signs[turn%2]);
        // Check if this move won
        if(check(signs[turn%2])){
            console.log(players[turn%2] + " Won")
            // GameOver disable all cells
            $.each($("button"), function() {
                $(this).prop("disabled",true);
            });
        }else {
            // Turn to next player
            $("#screen").text(players[turn%2] + " Turn"); 
            turn += 1;
        }
    }
}); 

/* Script for checking any invalid moves */
function isInvalid(cell) {
    if(cell.hasClass("fa-times") || cell.hasClass("fa-check")){
        cell.css("background-color", "red"); 
        setTimeout(() => { 
            cell.css("background-color", "white"); 
        }, 800);
        console.log("Invalid")
        return true
    }
    console.log("Valid")
}

/* Function to check the winning move */
function check(symbol) { 
    if ($(".sq1").hasClass(symbol) &&  
        $(".sq2").hasClass(symbol) && 
        $(".sq3").hasClass(symbol)) 
    { 
        $(".sq1").css("color", "green"); 
        $(".sq2").css("color", "green"); 
        $(".sq3").css("color", "green"); 
        return true; 
    } else if ($(".sq4").hasClass(symbol) 
            && $(".sq5").hasClass(symbol) 
            && $(".sq6").hasClass(symbol)) 
    { 
        $(".sq4").css("color", "green"); 
        $(".sq5").css("color", "green"); 
        $(".sq6").css("color", "green"); 
        return true; 
    } else if ($(".sq7").hasClass(symbol) 
            && $(".sq8").hasClass(symbol) 
            && $(".sq9").hasClass(symbol)) 
    { 
        $(".sq7").css("color", "green"); 
        $(".sq8").css("color", "green"); 
        $(".sq9").css("color", "green"); 
        return true; 
    } else if ($(".sq1").hasClass(symbol) 
            && $(".sq4").hasClass(symbol) 
            && $(".sq7").hasClass(symbol))  
    { 
        $(".sq1").css("color", "green"); 
        $(".sq4").css("color", "green"); 
        $(".sq7").css("color", "green"); 
        return true; 
    } else if ($(".sq2").hasClass(symbol) 
            && $(".sq5").hasClass(symbol) 
            && $(".sq8").hasClass(symbol)) 
    { 
        $(".sq2").css("color", "green"); 
        $(".sq5").css("color", "green"); 
        $(".sq8").css("color", "green"); 
        return true; 
    } else if ($(".sq3").hasClass(symbol) 
            && $(".sq6").hasClass(symbol) 
            && $(".sq9").hasClass(symbol))  
    { 
        $(".sq3").css("color", "green"); 
        $(".sq6").css("color", "green"); 
        $(".sq9").css("color", "green"); 
        return true; 
    } else if ($(".sq1").hasClass(symbol) 
            && $(".sq5").hasClass(symbol) 
            && $(".sq9").hasClass(symbol))  
    { 
        $(".sq1").css("color", "green"); 
        $(".sq5").css("color", "green"); 
        $(".sq9").css("color", "green"); 
        return true; 
    } else if ($(".sq3").hasClass(symbol) 
            && $(".sq5").hasClass(symbol) 
            && $(".sq7").hasClass(symbol))  
    { 
        $(".sq3").css("color", "green"); 
        $(".sq5").css("color", "green"); 
        $(".sq7").css("color", "green"); 
        return true; 
    } else { 
        return false; 
    } 
}

/* Resetting the game */
function reset(){ 
    $("#screen").text("PLAYER 1 TURN FOLLOWS")
        .css("background-color", "transparent"); 
    $(".r").removeClass("fa fa-2x fa-check")
        .removeClass("fa fa-2x fa-times"); 
    turn=1; 

    // Enable all buttons
    $.each($("button"), function() {
        $(this).prop("disabled",false)
            .removeAttr('style');
    });
} 