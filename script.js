(function master () {

let firstPlayersSelctedCells = [];
let secondPlayersSelectedCells = [];
let cellsObject = {};
let currentTurn = firstPlayersSelctedCells;

(function populateCellsObject(){
    cellsArray = Array.from(document.querySelectorAll('.cells'));
    for (let i = 0; i < cellsArray.length; i++) {
        cellsObject[i+1] = {domElement : cellsArray[i], isAlreadyClicked : false};
        cellsArray[i].addEventListener('click', function() {clickCellEvent(i, currentTurn)});
    }
    return cellsObject
    })  ();


    function clickCellEvent (i, currentTurn) {
        if (cellsObject[i+1].isAlreadyClicked === true) {
            alert('invalid selection')
        }
        else {

            cellsObject[i+1].isAlreadyClicked = true;
            currentTurn.push(i+1);
            checkWinningConditions(currentTurn, winningCombinations);
            switchTurn();
            console.log(firstPlayersSelctedCells)
            console.log(secondPlayersSelectedCells)
        }
    }
    console.log(cellsObject)
    

const winningCombinations = {
    //orizontal
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
}

function switchTurn () {
    if (currentTurn === firstPlayersSelctedCells) {
        currentTurn = secondPlayersSelectedCells
    }
    else {
        currentTurn = firstPlayersSelctedCells
    }
};


function resetMatch () {
    (function setclickedStatutToFalse () {
        for (let i = 1; i < 10; i++) {
        cellsObject[i].isAlreadyClicked = false
        }
    }) ();
    (function resetPlayersArrays () {
        firstPlayersSelctedCells = [];
        secondPlayersSelectedCells = [];
    }) ();
}


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
}











}) ();