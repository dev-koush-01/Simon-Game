var gamePattern=[];
var buttonColours=[
    "red", "blue", "green", "yellow"
];
var userClickedPattern=[];

var level = 0;

function startOver(){
    gamePattern=[]
    userClickedPattern=[]
    level=0;
    $(document).one("keydown", nextSequence);
}

function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3")
        audio.play()
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed")
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed")
    }, 100);
}

function nextSequence(){
    userClickedPattern=[]; // Resets the user pattern for the next level
    var randonNum = Math.floor(Math.random()*4)
    var randomChosenColour=buttonColours[randonNum]
    gamePattern.push(randomChosenColour)
    
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour) // Add sound for new sequence

    
    level++;
    $("#level-title").text("Level "+level)
    

}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success")
        if (userClickedPattern.length===gamePattern.length) {
            console.log("sequence completed")
            setTimeout(()=>{
                
                nextSequence()
            },1000)
        }
    }else{
        console.log("wrong")
        
        $("body").addClass("game-over")
        
        setTimeout(()=>{
            $("body").removeClass("game-over")
            
        },200)
        playSound("wrong")
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver()
    }
}

$(".btn").on("click",function(){
        var userChosenColour=$(this).attr("id")
        userClickedPattern.push(userChosenColour);
        console.log(userClickedPattern)
        console.log(gamePattern)
        playSound(userChosenColour)
        animatePress(userChosenColour)
        checkAnswer(userClickedPattern.length-1)
    })

$(document).one("keydown",function(){
    nextSequence();

})

// function soundOnPress(key){
//     var audio;
//     switch (key) {
//         case "q":
//             audio=new Audio("./sounds/green.mp3")
//             audio.play()
//             break;
//         case "w":
//             audio=new Audio("./sounds/red.mp3")
//             audio.play()
//             break;
//         case "a":
//             audio=new Audio("./sounds/yellow.mp3")
//             audio.play()
//             break;
//         case "s":
//             audio=new Audio("./sounds/blue.mp3")
//             audio.play()
//             break;
    
//         default:
//             console.log("Wrong key pressed: "+key)
//             break;
//     }
// }

// $(document).on("keydown",function(key){
//     soundOnPress(key.key)
// })