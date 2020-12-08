/* Consecutive player Turns */
// Flag variable for checking Turn 
// We'll be modifying our base logic in the 
// next steps as per requirements     
var turn = 1; 
  
$("button").click(function() { 
    if(turn == 1) { 
        $("#screen").text("PLAYER 2 TURN FOLLOWS"); 
   
        // Check sign font from font-awesome 
        $(this).addClass("fa fa-2x fa-check");
            turn = 2;             
    } 
    else {     
        $("#screen").text("PLAYER 1 TURN FOLLOWS"); 
       
        // Cross sign font from font-awesome 
        $(this).addClass("fa fa-2x fa-times");  
        turn = 1; 
    } 
}); 

/* Script for checking any invalid moves */
$("button").click(function() { 
    if($(this).hasClass("fa fa-2x fa-times") || 
            $(this).hasClass("fa fa-2x fa-check")) 
    {        
        $(this).css("background-color", "red"); 
        setTimeout(() => { 
            $(this).css("background-color", "white"); 
        }, 800);         
    } 
});

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
function reset() 
{ 
   $("#screen").text("PLAYER 1 TURN FOLLOWS"); 
   $("#screen").css("background-color", "transparent"); 
   $(".r").removeClass("fa fa-2x fa-check"); 
   $(".r").removeClass("fa fa-2x fa-times"); 
   turn=1; 
  
   // Reset Colors 
   $(".sq1").css("color", "black"); 
   $(".sq2").css("color", "black"); 
   $(".sq3").css("color", "black"); 
   $(".sq4").css("color", "black"); 
   $(".sq5").css("color", "black"); 
   $(".sq6").css("color", "black"); 
   $(".sq7").css("color", "black"); 
   $(".sq8").css("color", "black"); 
   $(".sq9").css("color", "black"); 
  
} 