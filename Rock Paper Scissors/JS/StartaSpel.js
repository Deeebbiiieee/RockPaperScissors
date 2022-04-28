let choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const visa = document.querySelector('.visa');
const scoreboard = {
    spelare: 0,
    dator: 0
};

// Spela spelet
function play(e) {
    const spelareChoice = e;
    const datorChoice = getDatorChoice();
    const winner = getWinner(spelareChoice, datorChoice);
    showWinner(winner);

}
// Datorns val
function getDatorChoice() {
    const rand = Math.random();
    if (rand < 0.34) {
        return 'ROCK';
    } else if (rand <= 0.67) {
        return 'PAPER';
    } else {
        return 'SCISSORS';
    }
}

    // Vinnare, Lika
    function getWinner(s, d) {
        if (s === d) {
            return 'lika';
        } else if (s === 'ROCK') {
            if (d === 'PAPER') {
                return 'dator';
            } else {
                return 'spelare';
            }
        } else if (s === 'PAPER') {
            if (d === 'SCISSORS') {
                return 'dator';
            } else {
                return 'spelare';
            }
        } else if (s === 'SCISSORS') {
            if (d === 'ROCK') {
                return 'dator';
            } else {
                return 'spelare';
            }
        }
    }

    function showWinner(winner, datorChoice) {
        if (winner === 'spelare') {
            // Skriva in spelarens resultat
            scoreboard.spelare++; //plussas alltid med ett
            result.innerHTML = `
          <h1 class="text-win">YAAAYY! DU VANN!</h1>
          <p>Datorn valde <strong{datorChoice.charAt(0).toUpperCase() +
            datorChoice.slice(1)}></strong></p>
        `; // Datorns resultat
        } else if (winner === 'dator') {
            scoreboard.dator++; // Plussas alltid med ett
            result.innerHTML = `
          <h1 class="text-lose">Du förlorade 😔 </h1>
          <p>Datorn valde <strong{datorChoice.charAt(0).toUpperCase() +
            datorChoice.slice(1)}></strong></p>
        `;
        } else {
            result.innerHTML = `
          <h1>Ni fick lika...</h1>
          <p>Datorn valde <strong{datorChoice.charAt(0).toUpperCase() +
            datorChoice.slice(1)}></strong></p>
        `;
        }
        // Visa resultat
        score.innerHTML = `
        <p>spelare: ${scoreboard.spelare}</p>
        <p>dator: ${scoreboard.dator}</p>
        `;
        visa.style.display = 'block'
        }



    // Starta om
    function restartGame() {
        scoreboard.spelare = 0;
        scoreboard.dator = 0;
        score.innerHTML = `
        <p>Spelare: 0</p>
        <p>Dator: 0</p>
    `;
}

function clearVisa(e) {
    if (e === visa) {
        visa.style.display = 'none';
    }
}

   //Event listeners
    restart.addEventListener('click', restartGame, clearVisa);
    window.addEventListener('click', clearVisa);