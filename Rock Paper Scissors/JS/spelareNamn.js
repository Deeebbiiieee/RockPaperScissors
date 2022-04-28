let nySpelare = document.getElementById("nySpelare");
let dator = document.getElementById("dator");


function score (gameStatus){
    nySpelare.innerHTML = gameStatus.name;

    if (gameStatus.opponentName){
        dator.innerHTML = gameStatus.opponentName;
    }
    else{
        nySpelare.innerHTML = "väntar..."
    }
}

function updateGameStatus() {
    RpsApi.getGameSatus()
        .then(gameStatus=> score(gameStatus))
}
setInterval(updateGameStatus,3000)