// jose-g315 
// logic and dom manipulation for the game

displayController = (function () {

    function createGrid(array) {
        const gameBoard = document.querySelector(".game-board");
        let xTurn = true;
        
        array.forEach((element,index) => {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.addEventListener("click", () => {
                xTurn = populateGrid(tile, xTurn, array, index);
                console.table(array);
                ticTacToe.playGame(array);
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
        const resetButton = document.querySelector(".reset-button");
        resetButton.addEventListener("click", () => {
            array.forEach((element, index, array) => {
                const tile = document.querySelector(".tile");
                tile.remove();
                array[index] = 5;
                
            });
            console.table(array);
            createGrid(array);
        })
        
    }

    function createPlayers() {
        const dialog = document.querySelector("dialog");
        const playerOneName = document.querySelector(".player-one-name");
        const playerOneScore = document.querySelector(".player-one-score");
        const playerTwoName = document.querySelector(".player-two-name");
        const playerTwoScore = document.querySelector(".player-two-score");
        const addPlayerButton = document.querySelector(".add-players");
        dialog.showModal();
        addPlayerButton.addEventListener("click", () => {
            let playerOne = createPlayer(document.querySelector("#playerOne").value);
            let playerTwo = createPlayer(document.querySelector("#playerTwo").value);
            playerOneName.textContent = playerOne.player;
            playerOneScore.textContent = playerOne.getScore();
            playerTwoName.textContent = playerTwo.player;
            playerTwoScore.textContent = playerTwo.getScore();
        });


    }


    return {
        createGrid, resetGrid, createPlayers
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
        } else if (checkRow(array) === 0 || checkColumn(array) === 0 || checkDiagonal(array) === 0) {
            console.log("O is Winner");
        } else if (!array.includes(5)) {
            // if there are no winners and 5's from the initial array then a tie has occurred
            console.log("Tie");
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
    const player = "Player: " + name;
    const score = 0;
    const getScore = () => score;
    const increaseScore = () => score++;
    return {
        player, score, getScore, increaseScore
    }
}

displayController.createPlayers();
displayController.createGrid(gameGrid.grid);
displayController.resetGrid(gameGrid.grid);

//ticTacToe.playGame(gameBoard.board);
