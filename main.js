// jose-g315 
// logic and dom manipulation for the game

function createGrid(array) {
    const gameBoard = document.querySelector(".game-board");
    let xTurn = true;
    
    array.forEach((element,index) => {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.addEventListener("click", () => {
            xTurn = populateGrid(tile, xTurn, array, index);
            //console.log(index)
            //console.table(array);
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
        console.log(turn + "1");
        turn = false;
        console.log(turn + "1");
        return turn;
    } else if (!turn && tile.textContent.length === 0) {
        tile.textContent = "O";
        array.splice(index, 1, 0);
        console.log(turn + "2");
        turn = true;
        console.log(turn + "2");
        return turn;
    } else {
        return turn;
    }
}

gameBoard = (function() {
    // game board array
    let board = [
        5,5,5,
        5,5,5,
        5,5,5
    ];
    return {
        board
    }
})();
createGrid(gameBoard.board);

ticTacToe = (function () {
    /*  using numbers instead of strings to play the game
        X's are represented by ones and O's by zeros 
        the winner is determined by finding the sum each row, columns, and diagonal
        sum of 3 means X wins and sum of 0 mean O wins  */

    function checkRow(board) {
        let index = 0;
        // checking sum of each row, each loop checks the next row 
        // then returning 3 for X as the winner and 0 for O as the winner
        for (i = 0; i < 3; i++) {
            let rowSum = board[index] + board[index + 1] + board[index + 2];
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
    function checkColumn(board) {
        let index = 0;
        // checking sum of each column, each loop checks the next row 
        // then returning 3 for X as the winner and 0 for O as the winner
        for (i = 0; i < 3; i++) {
            let columnSum = board[index] + board[index + 3] + board[index + 6];
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
    function checkDiagonal(board) {
        // checking sum of each diagonal 
        // then returning 3 for X as the winner and 1 for O as the winner
        let diagonalOneSum = board[0] + board[4] + board[8];
        let diagonalTwoSum = board[2] + board[4] + board[6];
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
    function playGame(board) {
        // calling all method to determine winner 
        if (checkRow(board) === 3 || checkColumn(board) === 3 || checkDiagonal(board) === 3){
            console.log("X is Winner");
        } else if (checkRow(board) === 0 || checkColumn(board) === 0 || checkDiagonal(board) === 0) {
            console.log("O is Winner");
        } else {
            console.log("Game In Progress");
        }
    }

    return {
        playGame
    }
})();

//ticTacToe.playGame(gameBoard.board);
