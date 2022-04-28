const ROCK = document.getElementById('ROCK');
const PAPER = document.getElementById('PAPER');
const SCISSORS = document.getElementById('SCISSORS');
let newGame = document.getElementById('newGame');




function joinGame (gameId) {
    console.log("JoinGame:", gameId);
    let name = prompt("Skriv ditt namn", "Anonymous");
    RpsApi.setName(name).then(response => {
        RpsApi.joinGame(gameId)
            .then(gameStatus => {
                sessionStorage.setItem('JoinGame', 'true', gameStatus)
                window.location.href = "Online.html";
            })
    })
}

function startGames() {
    let nameUser = newGame.value;
    sessionStorage.setItem('nameUser', nameUser);
    let name = sessionStorage.getItem('nameUser');
    RpsApi.setName(name).then(response => {
        RpsApi.newGame(name).then(gameStatus =>{
            sessionStorage.setItem('joinGame','false')
            window.location.href = "Online.html";
        })

    })
}

function startRemoteGame() {
    let nameUser = document.getElementById('newGame');
    sessionStorage.setItem('nameUser', nameUser);
    if (nameUser === '' || nameUser === '') {
        name = 'Anonymous';
    }
}

function move(nySpelareChoice){
    RpsApi.userMove(nySpelareChoice).then (gameStatus=>{
        console.log('gameStatus', gameStatus)
        resultGame(gameStatus);
    })
}

function gameList() {
    console.log('gameList');
    RpsApi.allGames()
        .then(games => {
            console.log('games',games);
            let gamesHtml = games.map(game => {
                return '<button onclick="joinGame(\'' + game.gameId + '\')">' + game.name + ' </button>'
            })
                .join("");
            document.getElementById("gameList").innerHTML = gamesHtml;

        })
}


function WIN (nySpelareScore, datorScore) {
    nySpelare++;
    nySpelareScore.innerHTML = nySpelareScore.toString();
    datorScore.innerHTML = datorScore.toString();
    result.innerHTML = nySpelareScore + "vinner över" + datorScore + "YYAAAY DU VANN!!!"
}

function LOSE(nySpelareScore, datorScore) {
    dator++;
    datorScore.innerHTML = datorScore.toString();
    nySpelareScore.innerHTML = nySpelareScore.toString();
    result.innerHTML = nySpelareScore + "förlorar mot" + datorScore + "Du förlorade..."
}

function DRAW(nySpelareScore, datorScore) {
    result.innerHTML = nySpelareScore + "är lika" + datorScore + "Ni fick lika!"
};

function main() {
        ROCK.addEventListener('click', function () {
            move('ROCK');
        })
        PAPER.addEventListener('click', function () {
            move('PAPER');
        })
        SCISSORS.addEventListener('click', function () {
            move('SCISSORS');
        })
}



function resultGame(gameStatus) {
        let joinGame = sessionStorage.getItem('joinGame');
        if (joinGame === 'true') {
            switch (gameStatus.game) {
                case 'WIN':
                    WIN(gameStatus.opponentMove, gameStatus.move);
                    break;
                case 'LOSE':
                    LOSE(gameStatus.opponentMove, gameStatus.move);
                    break;
                case 'DRAW':
                    DRAW(gameStatus.opponentMove, gameStatus.move);
                    break;
            }
        } else {
            switch (gameStatus.game) {
                case 'WIN':
                    WIN(gameStatus.move, gameStatus.opponentMove);
                    break;
                case 'LOSE':
                    LOSE(gameStatus.move, gameStatus.opponentMove);
                    break;
                case 'DRAW':
                    DRAW(gameStatus.move, gameStatus.opponentMove);
                    break;
            }
        }
        if (gameStatus.game === 'WIN' || gameStatus.game === 'LOSE' || gameStatus.game === 'DRAW') {
            clearInterval(refreshGameStatus);
        }
    }

function gameStatus() {
    RpsApi.allGames()
        .then(games => {
            if (games.length === null || games.length === 'null') {
                document.getElementById('gameList').innerHTML = 'väntar..';
            }
            document.getElementById('gameList').innerHTML = games.map(game => {
                return startRemoteGame(game.gameId, game.name);
            })
                .join("");
        });

}

function refreshGameStatus() {
        RpsApi.getGameSatus()
                  .then(gameStatus => {
                if (gameStatus.move === '') {
                    let joinGame = sessionStorage.getItem('joinGame');
                    if (joinGame === 'true') {
                        document.getElementById('dator').innerHTML = gameStatus.name;
                        document.getElementById('nySpelare').innerHTML = gameStatus.opponentName;
                    } else {
                        document.getElementById('nySpelare').innerHTML = gameStatus.name;
                        document.getElementById('dator').innerHTML = gameStatus.opponentName;
                    }
                }
                resultGame(gameStatus);
            })
    }

function refreshGamesEachSec() {
    setInterval(refreshGameStatus, 1000);
}

refreshGamesEachSec();
