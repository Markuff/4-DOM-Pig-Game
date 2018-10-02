/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

    const CONSTANTS = {
        CLASSES: {
            ACTIVE: '.active',
            BTN_HOLD: '.btn-hold',
            BTN_NEW: '.btn-new',
            BTN_ROLL: '.btn-roll',
            DICE: '.dice',
            PLAYER_CERO_PANEL: '.player-0-panel',
            PLAYER_CURRENT_SCORE: '.player-current-score',
            PLAYER_SCORE: '.player-score',
            WINNER: '.winner'
        },
        EVENTS: {
            CLICK: 'click'
        },
        PARAMS: {
            ACTIVE: 'active',
            SIDE_ONE: 1,
            TARGET_SCORE: 20,
            WINNER: 'winner'
        },
        STYLES: {
            BLOCK: 'block',
            NONE: 'none'
        }
    }

    let currentAcumulated,
        die,
        idCurrentPlayer,
        totalAcumulated;

    die = document.querySelector(CONSTANTS.CLASSES.DICE);

    function hideDie() {
        die.style.display = CONSTANTS.STYLES.NONE;
    }

    function hold() {
        totalAcumulated[idCurrentPlayer] += currentAcumulated;

        document.querySelector(`#score-${idCurrentPlayer}`).textContent = totalAcumulated[idCurrentPlayer];

        if (totalAcumulated[idCurrentPlayer] < CONSTANTS.PARAMS.TARGET_SCORE) {
            setNextPlayer();
        } else {
            let byNameClass;
    
            byNameClass = document.querySelector(`.player-${idCurrentPlayer}-panel`);
            byNameClass.classList.toggle(CONSTANTS.PARAMS.ACTIVE);
            byNameClass.classList.toggle(CONSTANTS.PARAMS.WINNER);
            document.querySelector(`#name-${idCurrentPlayer}`).textContent = CONSTANTS.PARAMS.WINNER;
            document.querySelector(`#current-${idCurrentPlayer}`).textContent = 0;
        }
    }

    function init() {
        const tempId = idCurrentPlayer;

        currentAcumulated = 0;
        idCurrentPlayer = 0;
        totalAcumulated = [0,0];

        hideDie();

        for (let i = 0; i < totalAcumulated.length; i++) {
            document.querySelectorAll(CONSTANTS.CLASSES.PLAYER_CURRENT_SCORE)[i].textContent = currentAcumulated;
            document.querySelectorAll(CONSTANTS.CLASSES.PLAYER_SCORE)[i].textContent = totalAcumulated[i];
        }

        if (document.querySelector(CONSTANTS.CLASSES.WINNER)) {
            document.querySelector(`#name-${tempId}`).textContent = `player ${tempId + 1}`;
            document.querySelector(`#player-${tempId}-panel`).classList.remove(CONSTANTS.PARAMS.WINNER);
            document.querySelector(CONSTANTS.CLASSES.PLAYER_CERO_PANEL).classList.toggle(CONSTANTS.PARAMS.ACTIVE);
        }
    }

    function roll() {
        let dieValue;

        dieValue = getDieValue();

        die.src = `dice-${dieValue}.png`;
        die.style.display = CONSTANTS.STYLES.BLOCK;

        if (dieValue !== CONSTANTS.PARAMS.SIDE_ONE) {
            currentAcumulated += dieValue;

            document.querySelector(`#current-${idCurrentPlayer}`).textContent = currentAcumulated;
        } else {
            setNextPlayer();
        }
    }

    function getDieValue() {
        return Math.floor(Math.random() * 6) + 1;
    }

    function setNextPlayer() {
        const tempId = idCurrentPlayer;

        let tempPlayer;

        currentAcumulated = 0;
        idCurrentPlayer = idCurrentPlayer === 0 ? 1 : 0;

        hideDie();

        tempPlayer = document.querySelector(`#current-${tempId}`)
        tempPlayer.textContent = 0;
        document.querySelector(`.player-${tempId}-panel`).classList.toggle(CONSTANTS.PARAMS.ACTIVE);
        document.querySelector(`.player-${idCurrentPlayer}-panel`).classList.toggle(CONSTANTS.PARAMS.ACTIVE);
    }

    document.querySelector(CONSTANTS.CLASSES.BTN_HOLD).addEventListener(CONSTANTS.EVENTS.CLICK, hold);
    document.querySelector(CONSTANTS.CLASSES.BTN_NEW).addEventListener(CONSTANTS.EVENTS.CLICK, init);
    document.querySelector(CONSTANTS.CLASSES.BTN_ROLL).addEventListener(CONSTANTS.EVENTS.CLICK, roll);

    init();
