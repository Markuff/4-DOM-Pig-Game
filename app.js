/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

    const CONSTS = {
        CLASSES: {
            active: '.active',
            btnHold: '.btn-hold',
            btnNew: '.btn-new',
            btnRoll: '.btn-roll',
            dice: '.dice',
            playerCurrentScore: '.player-current-score',
            playerName: '.player-name',
            playerScore: '.player-score',
            winner: '.winner'
        },
        EVENTS: {
            click: 'click'
        },
        PARAMS: {
            active: 'active',
            numberIdOnClass: 7,
            startingPlayer: 0,
            winner: 'winner'
        },
        STYLES: {
            block: 'block',
            none: 'none'
        }
    };

    let acumulatedRollingScore,
        idPlayerRolling,
        totalAcumulated;

    //functions
    function acumulateScore(val, id) {
        acumulatedRollingScore += val;
        document.querySelector(`#current-${id}`).textContent = acumulatedRollingScore;
    }

    function changePlayer(id) {
        acumulatedRollingScore = 0;
        document.querySelector(`#current-${id}`).textContent = acumulatedRollingScore;
        document.querySelector(`.player-${id}-panel`).classList.toggle(CONSTS.PARAMS.active);
        idPlayerRolling = changePlayerId(id);
        document.querySelector(`.player-${idPlayerRolling}-panel`).classList.toggle(CONSTS.PARAMS.active);
    }
    
    function changePlayerId(id) {
        return id === '0' ? '1' : '0';
    }

    function getIdActivePanel(player) {
        return player.classList[CONSTS.PARAMS.startingPlayer][CONSTS.PARAMS.numberIdOnClass];
    }

    function getPlayerActive() {
        return document.querySelector(CONSTS.CLASSES.active);
    }
    
    function newGame() {
        let idWinner;

        if (document.querySelector(CONSTS.CLASSES.winner)) {
            idWinner = document.querySelector('.winner .player-name').id.split('-')[1];
            document.querySelector(`#name-${idWinner}`).textContent = `player ${parseInt(idWinner) + 1}`;
            document.querySelector(CONSTS.CLASSES.winner).classList.toggle(CONSTS.PARAMS.winner);
        }

        document.querySelector('.player-0-panel').classList.add(CONSTS.PARAMS.active);
        idPlayerRolling = getIdActivePanel(getPlayerActive());
        acumulatedRollingScore = 0;
        document.querySelector(CONSTS.CLASSES.dice).style.display = CONSTS.STYLES.none;
        document.querySelector(CONSTS.CLASSES.btnRoll).style.display = CONSTS.STYLES.block;
        document.querySelector(CONSTS.CLASSES.btnHold).style.display = CONSTS.STYLES.block;

        for (let i = 0; i < document.querySelectorAll(CONSTS.CLASSES.playerName).length; i++) {
            document.querySelectorAll(CONSTS.CLASSES.playerCurrentScore)[i].textContent = 0;
            document.querySelectorAll(CONSTS.CLASSES.playerScore)[i].textContent = 0;
        }
    }

    function rollDie() {
        document.querySelector(CONSTS.CLASSES.dice).style.display = CONSTS.STYLES.block;

        return Math.floor((Math.random() * 6) + 1);
    }

    function validateWinner(id) {
        return parseInt(document.querySelector(`#score-${id}`).textContent) + parseInt(document.querySelector(`#current-${id}`).textContent);
    }

    function warpUp (id) {
        document.querySelector(`.player-${id}-panel`).classList.toggle(CONSTS.PARAMS.winner);
        document.querySelector(`.player-${id}-panel`).classList.toggle(CONSTS.PARAMS.active);
        document.querySelector(CONSTS.CLASSES.btnRoll).style.display = CONSTS.STYLES.none;
        document.querySelector(CONSTS.CLASSES.btnHold).style.display = CONSTS.STYLES.none;
        document.querySelector(`#name-${id}`).textContent = CONSTS.PARAMS.winner;
    }

    //DOM events
    document.querySelector(CONSTS.CLASSES.btnNew).addEventListener(CONSTS.EVENTS.click, function () {
        newGame();
    });

    document.querySelector(CONSTS.CLASSES.btnRoll).addEventListener(CONSTS.EVENTS.click, function() {
        let diceValue;

        diceValue = rollDie();
        document.querySelector(CONSTS.CLASSES.dice).src = `dice-${diceValue}.png`;

        if (diceValue !== 1) {
            acumulateScore(diceValue, idPlayerRolling);

            if (validateWinner(idPlayerRolling) >= 10) {
                warpUp(idPlayerRolling);
            }
        } else {
            changePlayer(idPlayerRolling);
        }
    });

    document.querySelector(CONSTS.CLASSES.btnHold).addEventListener(CONSTS.EVENTS.click, function() {
        totalAcumulated = parseInt(document.querySelector(`#score-${idPlayerRolling}`).textContent);
        totalAcumulated += acumulatedRollingScore;
        document.querySelector(`#score-${idPlayerRolling}`).textContent = totalAcumulated;

        changePlayer(idPlayerRolling);
    });

    newGame();
