RpsApi = {

    newtoken: () => {
        sessionStorage.getItem('token')
        fetch('https://java19.sensera.se/auth/token')
            .then(response =>response.text())
            .then(text =>sessionStorage.setItem('token',text))
    },

    allGames: () => {
        return fetch('https://java19.sensera.se/games', {headers:{token: sessionStorage.getItem('token')}})
            .then(response => response.json())
    },

    setName: (name) => {
        return fetch('https://java19.sensera.se/user/name',
            {
                method: 'POST',
                body: JSON.stringify({"name": name}),
                headers: {'token': sessionStorage.getItem('token'), 'Content-Type': 'application/json;charset=UTF-8'}
            })
            .then(response => response.text())
    },

    joinGame:(gameId) => {
        return fetch('https://java19.sensera.se/games/join/' + gameId, {headers:{token: sessionStorage.getItem('token')}})
            .then(response => response.json())
    },

    userMove:(move) => {
    return fetch('https://java19.sensera.se/games/move/' + move, {headers:{token: sessionStorage.getItem('token')}})
        .then(response => response.json())
    },

    getGameSatus:() => {
        return fetch('https://java19.sensera.se/games/status', {headers:{token: sessionStorage.getItem('token')}})
            .then(response => response.json())
    },

    newGame: () => {
        return fetch('https://java19.sensera.se/games/start',
            {headers: {'token': sessionStorage.getItem('token')}})
            .then(response => response.json())
    },
};

if(sessionStorage.getItem('token') == null){
    RpsApi.newtoken();
}