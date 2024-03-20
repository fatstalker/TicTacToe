(function master () {



function singleMatch () {

    //initialize assets
    let assets = {
        firstPlayersSelectedCells : [],
        secondPlayersSelectedCells : [],
        cellsObject : {},
        cellsArray : Array.from(document.querySelectorAll('.cells')),
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
        assets.currentTurn = assets.firstPlayersSelectedCells
    }) ();
    //-------------------- should I keep this in the single match scope?


    let render = {
        simbolsOnGameboard : function (i, currentTurn) {
            if (currentTurn == assets.firstPlayersSelectedCells) {
                assets.cellsArray[i].textContent = 'X'
            }
            else {
                assets.cellsArray[i].textContent = 'O'
            }
        },
        clearSimbolsOnGameboard : function () {
            for (let i = 0; i < assets.cellsArray.length; i++) {
                assets.cellsArray[i].textContent = '';
            }
        },

    };

    (function populateCellsObject (){
        for (let i = 0; i < assets.cellsArray.length; i++) {
            assets.cellsObject[i+1] = {domElement : assets.cellsArray[i], isAlreadyClicked : false};
            assets.cellsArray[i].addEventListener('click', function() {clickCellEvent(i, assets.currentTurn)});
        };
        })  ();


        function clickCellEvent (i, currentTurn) {
            if (assets.cellsObject[i+1].isAlreadyClicked === true) {
                alert('invalid selection')
            }
            else {
                
                assets.cellsObject[i+1].isAlreadyClicked = true; currentTurn.push(i+1);//populate player's array
                render.simbolsOnGameboard(i, currentTurn);
                checkWinningConditions(currentTurn, assets.winningCombinations);
                switchTurn();
                console.log(assets.firstPlayersSelectedCells)                           //to be removed
                console.log(assets.secondPlayersSelectedCells)                         //to be removed
            }
        };



    function switchTurn () {
        if (assets.currentTurn === assets.firstPlayersSelectedCells) {
            assets.currentTurn = assets.secondPlayersSelectedCells
        }
        else {
            assets.currentTurn = assets.firstPlayersSelectedCells
        }
    };


    function resetMatch () {
        (function setclickedStatutToFalse () {
            for (let i = 1; i < 10; i++) {
            assets.cellsObject[i].isAlreadyClicked = false
            }
        }) ();
        (function resetPlayersArrays () {
            assets.firstPlayersSelectedCells = [];
            assets.secondPlayersSelectedCells = [];
        }) ();
        setTimeout(function() {
            render.clearSimbolsOnGameboard();
        }, 10);
    };


    function checkWinningConditions(playerArray, winningCombinations) {
        for (let i = 1; i <= 8; i++) {
            let counter = 0;
            for (let j = 0; j <= 2; j++) {
                for (let k = 0; k <= playerArray.length; k++) {
                    if (winningCombinations[i][j] == playerArray[k]) {
                        counter ++;
                        if (counter == 3) {
                            incrementScore(playerArray);
                            matchEvaluation();
                            resetMatch();
                            console.log(players);
                            return
                        }
                    }
                }
            }
            if (i == 8) {   //after all win combinations are checked , check if all cells are clicked
            checkForTie();
            }
        }
    };
        function checkForTie() {
            let counter = 0;
            for (let i = 0; i < assets.cellsArray.length; i++) {
                if (assets.cellsArray[i].textContent != '') {
                    counter++
                }
            }
            if (counter == 9) {
                alert("It's a tie!!!");
                resetMatch();
                console.log(players);
            }
        }

    function incrementScore(player) {
        if (player == assets.firstPlayersSelectedCells) {
            players[0].score++;
            setTimeout(function() {
                alert(players[0].name + ' won this round');
            }, 10);
        }
        else if (player == assets.secondPlayersSelectedCells) {
            players[1].score++;
            setTimeout(function() {
                alert(players[1].name + ' won this round');
            }, 10);//endGameRender();location.reload() per ricaricare la pagina
        }
    };
    function matchEvaluation () {
        if (players[0].score == 3) {
            setTimeout(function() {
                alert ('congratulations ' + players[0].name + ', you won the game!');
            }, 11);
            
            players[1].score = 0;players[0].score = 0;
        }
        else if (players[1].score == 3) {
            setTimeout(function() {
                alert ('congratulations ' + players[1].name + ', you won the game!');
            }, 11);
            players[1].score = 0;players[0].score = 0;
        }
    };
};

let players =[];
(function gameFlow () {

    (function playerInitializer() {
        function playerConstructor (previousPlayer) {
            
            let name = (() => {
                if (players[0] && players[1]) {
                return prompt('What is your name?', previousPlayer)
                }
                else {return prompt('What is your name?', 'Mario')};
            }) (players);
            let player = {
                name : name,
                score : 0,
            };
            players.push(player);
        };
        playerConstructor(players[0]);playerConstructor(players[1]);
        console.log(players)
    }) ();


    
    
    
    singleMatch();


}) ();











}) ();