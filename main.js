// jose-g315 
// logic and dom manipulation for the game


gameBoard = (function() {
    // game board array
    let board = [
        0,1,1,
        1,1,0,
        1,0,0
    ];
    return {
        board
    }
})();

ticTacToe = (function () {

    function checkRow(board) {
        let index = 0;
        for (i = 0; i < 3; i++) {
            let rowSum = board[index] + board[index + 1] + board[index + 2];
            index = index + 3;
            if (rowSum === 3) {
                console.log(rowSum);
                return true;
            } else if (rowSum === 0) {
                console.log(rowSum);
                return false;
            }
        }
    }
    function checkColumn(board) {
        let index = 0;
        for (i = 0; i < 3; i++) {
            let columnSum = board[index] + board[index + 3] + board[index + 6];
            index = index + 3;
            if (columnSum === 3) {
                console.log(columnSum);
                return true;
            } else if (checkColumn === 0) {
                console.log(columnSum);
                return false;
            }
        }    
    }
    function checkDiagonal(board) {
        let diagonalOneSum = board[0] + board[4] + board[8];
        let diagonalTwoSum = board[2] + board[4] + board[6];
        if (diagonalOneSum === 3 || diagonalTwoSum === 3) {
            console.log("diagonal One " + diagonalOneSum);
            console.log("diagonal Two " + diagonalTwoSum);        
            return true;
        } else if (diagonalOneSum === 0 || diagonalTwoSum ===3) {
            console.log("diagonal One " + diagonalOneSum);
            console.log("diagonal Two " + diagonalTwoSum); 
            return false;
        }
    }
    function playGame(board) {
        if (checkRow(board) || checkColumn(board) || checkDiagonal(board)){
            console.log("X is Winner");
        } else if (!checkRow(board) || !checkColumn(board) || !checkDiagonal(board)) {
            console.log("O is Winner");
        }
    }

    return {
        playGame
    }
})();

ticTacToe.playGame(gameBoard.board);
