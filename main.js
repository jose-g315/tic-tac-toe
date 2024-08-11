// jose-g315 
// logic and dom manipulation for the game

displayController = (function (array) {

    let playerOne;
    let playerTwo;
    const playerOneName = document.querySelector(".player-one-name");
    const playerOneScore = document.querySelector(".player-one-score");
    const playerTwoName = document.querySelector(".player-two-name");
    const playerTwoScore = document.querySelector(".player-two-score");
    const dialog = document.querySelector("dialog");
    const addPlayerButton = document.querySelector(".add-players");
    const newGameButton = document.querySelector(".new-game-button");
    const resetButton = document.querySelector(".reset-button");
    const winnerDisplay = document.querySelector(".winner-display");

    function createGrid(array) {
        const gameBoard = document.querySelector(".game-board");
        let xTurn = true;
        let gameOver = false;
        
        array.forEach((element,index) => {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.addEventListener("click", () => {
                xTurn = populateGrid(tile, xTurn, array, index);
                displayTurn(xTurn);
                let winner = ticTacToe.playGame(array);
                if (!gameOver && (winner === 3 || winner === 0)) {
                    updateScore(winner);
                    gameOver = true;
                }
                
            });
            gameBoard.append(tile);
    
    
            // creating grid lines programmatically 
            if (index === 0 || index === 1 || index === 3 || index === 4) {
                tile.classList.add("bottom-right");
            } else if (index === 2 || index === 5) {
                tile.classList.add("bottom");
            } else if (index === 6 || index === 7) {
                tile.classList.add("right");
            }
        });
    }
    
    function displayTurn(turn) {
        if (turn) {
            playerOneName.classList.add("turn");
            playerTwoName.classList.remove("turn");
        } else if (!turn) {
            playerTwoName.classList.add("turn");
            playerOneName.classList.remove("turn");
        }
        
    }

    function populateGrid(tile, turn, array, index) {
        if (turn && tile.textContent.length === 0) {
            tile.textContent = "X";
            array.splice(index, 1, 1);
            turn = false;
            return turn;
        } else if (!turn && tile.textContent.length === 0) {
            tile.textContent = "O";
            array.splice(index, 1, 0);
            turn = true;
            return turn;
        } else {
            return turn;
        }
    }

    function resetGrid(array) {
        resetButton.addEventListener("click", () => {
            reset(array);
        })
        
    }
    function reset(array){
        array.forEach((element, index, array) => {
            const tile = document.querySelector(".tile");
            tile.remove();
            array[index] = 5;
            
        });
        createGrid(array);
        winnerDisplay.textContent = "";
    }

    function createPlayers() {
        dialog.showModal();
        addPlayerButton.addEventListener("click", () => {
            playerOne = createPlayer(document.querySelector("#playerOne").value);
            console.log(playerOne);
            playerOneName.textContent = playerOne.playerName;
            playerOneName.classList.add("player-name");
            playerOneName.classList.add("turn");
            playerTwo = createPlayer(document.querySelector("#playerTwo").value);
            console.log(playerTwo);
            playerTwoName.textContent = playerTwo.playerName;
            playerTwoName.classList.add("player-name");
            displayScores()
        });
        // resetting form
        document.querySelector("form").reset();
    }

    function displayScores() {
        playerOneScore.textContent = playerOne.getScore();
        playerOneScore.classList.add("player-score");
        playerTwoScore.textContent = playerTwo.getScore();
        playerTwoScore.classList.add("player-score");
    }

    function updateScore(winner) {
        if (winner === 3) {
            playerOne.increaseScore();
            displayScores();
            winnerDisplay.textContent = playerOne.playerName;
        } else if (winner === 0) {
            playerTwo.increaseScore();
            displayScores();
            winnerDisplay.textContent = playerTwo.playerName;
        } 
    }

    function startNewGame(array) {
        newGameButton.addEventListener("click", () => {
            createPlayers();
            reset(array);
        });
    }
    
    return {
        createGrid, resetGrid, createPlayers, startNewGame
    }

}) ();

ticTacToe = (function () {
    /*  using numbers instead of strings to play the game
        X's are represented by ones and O's by zeros 
        the winner is determined by finding the sum each row, columns, and diagonal
        sum of 3 means X wins and sum of 0 mean O wins  */

    function checkRow(array) {
        let index = 0;
        // checking sum of each row, each loop checks the next row 
        // then returning 3 for X as the winner and 0 for O as the winner
        for (i = 0; i < 3; i++) {
            let rowSum = array[index] + array[index + 1] + array[index + 2];
            index = index + 3;
            if (rowSum === 3) {
                console.log(rowSum);
                return 3;
            } else if (rowSum === 0) {
                console.log(rowSum);
                return 0;
            }
        }
    }
    function checkColumn(array) {
        let index = 0;
        // checking sum of each column, each loop checks the next row 
        // then returning 3 for X as the winner and 0 for O as the winner
        for (i = 0; i < 3; i++) {
            let columnSum = array[index] + array[index + 3] + array[index + 6];
            index = index + 1;
            if (columnSum === 3) {
                console.log(columnSum);
                return 3;
            } else if (columnSum === 0) {
                console.log(columnSum);
                return 0;
            }
        }    
    }
    function checkDiagonal(array) {
        // checking sum of each diagonal 
        // then returning 3 for X as the winner and 1 for O as the winner
        let diagonalOneSum = array[0] + array[4] + array[8];
        let diagonalTwoSum = array[2] + array[4] + array[6];
        if (diagonalOneSum === 3 || diagonalTwoSum === 3) {
            console.log("diagonal One " + diagonalOneSum);
            console.log("diagonal Two " + diagonalTwoSum);        
            return 3;
        } else if (diagonalOneSum === 0 || diagonalTwoSum === 0) {
            console.log("diagonal One " + diagonalOneSum);
            console.log("diagonal Two " + diagonalTwoSum); 
            return 0;
        }
    }
    function playGame(array) {
        // calling all method to determine winner 
        if (checkRow(array) === 3 || checkColumn(array) === 3 || checkDiagonal(array) === 3){
            console.log("X is Winner");
            return 3;
        } else if (checkRow(array) === 0 || checkColumn(array) === 0 || checkDiagonal(array) === 0) {
            console.log("O is Winner");
            return 0;
        } else if (!array.includes(5)) {
            // if there are no winners and 5's from the initial array then a tie has occurred
            console.log("Tie");
            return 2;  
        } else {
            console.log("Game In Progress");
        }
    }
    return {
        playGame
    }
})();


gameGrid = (function() {
    // game board array initialized with 5s
    let grid = [
        5,5,5,
        5,5,5,
        5,5,5
    ];
    return {
        grid
    }
})();

// factory function to create players
function createPlayer(name){
    const playerName = name;
    let score = 0;
    const getScore = () => score;
    const increaseScore = () => score++;
    return {
        playerName, getScore, increaseScore
    }
}

displayController.createPlayers();
displayController.createGrid(gameGrid.grid);
displayController.resetGrid(gameGrid.grid);
displayController.startNewGame(gameGrid.grid);

//ticTacToe.playGame(gameBoard.board);
