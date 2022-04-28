const input = document.querySelector('input');
let userNameInput = document.getElementById('StartaSpel-name');
let playButton = document.getElementById('button');

//box nr.2(enl. css)
let startGame = function () {
    let spelUserName = userNameInput.value;
    localStorage.setItem("StartaSpel-name", spelUserName);
    window.location.href = 'html/StartaSpel.html';
}

playButton.addEventListener('click', startGame);
userNameInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        startGame();
    }
});


input.addEventListener('input', updateUserLabel);

function updateUserLabel(input) {
    userLabel = input.target.value;
}
