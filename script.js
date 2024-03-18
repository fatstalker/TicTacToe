(function master () {

    let assets = {
        firstPlayersSelctedCells : [],
        secondPlayersSelectedCells : [],
        cellsObject : {},
        currentTurn : this.firstPlayersSelctedCells,
        winningCombinations : {
            1 : [1, 2, 3],
            2 : [4, 5, 6],
            3 : [7, 8, 9],
            //vertical
            4 : [1, 4, 7],
            5 : [2, 5, 8],
            6 : [3, 6, 9],
            //diagonal
            7 : [1, 5, 9],
            8 : [3, 5, 7],
        },
    };
    (function initializeCurrentTurnProperty () {
        assets.currentTurn = assets.firstPlayersSelctedCells
    }) ();

  

(function populateCellsObject (){
    cellsArray = Array.from(document.querySelectorAll('.cells'));
    for (let i = 0; i < cellsArray.length; i++) {
        assets.cellsObject[i+1] = {domElement : cellsArray[i], isAlreadyClicked : false};
        cellsArray[i].addEventListener('click', function() {clickCellEvent(i, assets.currentTurn)});
    }
    })  ();


    function clickCellEvent (i, currentTurn) {
        if (assets.cellsObject[i+1].isAlreadyClicked === true) {
            alert('invalid selection')
        }
        else {
            assets.cellsObject[i+1].isAlreadyClicked = true; currentTurn.push(i+1);//populate player's array
            checkWinningConditions(currentTurn, assets.winningCombinations);
            switchTurn();
            console.log(assets.firstPlayersSelctedCells)                           //to be removed
            console.log(assets.secondPlayersSelectedCells)                         //to be removed
        }
    };



function switchTurn () {
    if (assets.currentTurn === assets.firstPlayersSelctedCells) {
        assets.currentTurn = assets.secondPlayersSelectedCells
    }
    else {
        assets.currentTurn = assets.firstPlayersSelctedCells
    }
};


function resetMatch () {
    (function setclickedStatutToFalse () {
        for (let i = 1; i < 10; i++) {
        assets.cellsObject[i].isAlreadyClicked = false
        }
    }) ();
    (function resetPlayersArrays () {
        assets.firstPlayersSelctedCells = [];
        assets.secondPlayersSelectedCells = [];
    }) ();
};


function checkWinningConditions(playerArray, winningCombinations) {
    for (let i = 1; i <= 8; i++) {
        let counter = 0;
        for (let j = 0; j <= 2; j++) {
            for (let k = 0; k <= playerArray.length; k++) {
                if (winningCombinations[i][j] == playerArray[k]) {
                    counter ++;
                    if (counter == 3) {
                        alert('wiiinnnnnnn!');
                        resetMatch();
                    }
                }
            }
        }
    }
};











}) ();