var gamePattern=[];
var buttonColours=[
    "red", "blue", "green", "yellow"
];
var userClickedPattern=[];

var level = 0;
var started = false;

function resetGame(){
    gamePattern=[]
    userClickedPattern=[]
    level=0;
    started = false;
    $("#level-title").text("Press A Key to Start")
}

function startOver(){
    resetGame()
    $(document).one("keydown", nextSequence);
}

function restartGame(){
    resetGame();
    started = true;
    nextSequence();
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

function handleUserInput(color){
    userClickedPattern.push(color);
    console.log(userClickedPattern)
    console.log(gamePattern)
    playSound(color)
    animatePress(color)
    checkAnswer(userClickedPattern.length-1)
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
        handleUserInput(userChosenColour);
    })

$(document).one("keydown",function(){
    started = true;
    nextSequence();

})

function handleKeyPress(key){
    var color;
    switch (key.toLowerCase()) {
        case "q":
            color = "green";
            break;
        case "w":
            color = "red";
            break;
        case "a":
            color = "yellow";
            break;
        case "s":
            color = "blue";
            break;
        default:
            return; // Ignore other keys
    }
    handleUserInput(color);
}

$(document).on("keydown", function(event) {
    if (started) {
        handleKeyPress(event.key);
    }
})

$("#restart-btn").on("click", restartGame);