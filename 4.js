const numbers = [
  13, 79, 74, 35, 76, 12, 43, 71, 87, 72, 23, 91, 31, 67, 58, 61, 96, 16, 81,
  92, 41, 6, 32, 86, 77, 42, 0, 55, 68, 14, 53, 26, 25, 11, 45, 94, 75, 1, 93,
  83, 52, 7, 4, 22, 34, 64, 69, 88, 65, 66, 39, 97, 27, 29, 78, 5, 49, 82, 54,
  46, 51, 28, 98, 36, 48, 15, 2, 50, 38, 24, 89, 59, 8, 3, 18, 47, 10, 90, 21,
  80, 73, 33, 85, 62, 19, 37, 57, 95, 60, 20, 99, 17, 63, 56, 84, 44, 40, 70, 9,
  30
];

const fs = require("fs");

fs.readFile("4_input.txt", "utf-8", (err, data) => {
  if (err) throw err;
  const strBoards = data.split("\n\n").map((board) => board.split("\n"));
  const arrBoards = strBoards.map((board) =>
    board
      .map((row) => {
        return row
          .replace(/\s\s+/g, " ")
          .split(" ")
          .filter((element) => element != "");
      })
      .filter((element) => element != null)
  );
  // arrBoards is an array boards; a board is an array of array of rows
  /*
  [
    [ '42', '57', '40', '73', '32' ],
    [ '70', '79', '80', '11', '67' ],
    [ '55', '26', '87', '92', '19' ],
    [ '63', '58', '78', '29', '77' ],
    [ '17', '74', '18', '20', '60' ]
  ]
  */
  let formattedArr = arrBoards.map((board) =>
    board.map((row) =>
      row.map((element) => {
        return { val: parseInt(element), isMarked: false };
      })
    )
  );

  const getColumnFromBoard = (board, column) => {
    // return an array of values corresponding to the column column of a board
    const res = [];
    for (let row of board) {
      res.push(row[column]);
    }
    return res;
  };

  const checkBoardIfWinning = (board) => {
    // we need to check rows and columns
    // row first
    for (let row of board) {
      const isRowWinning = row.every((element) => element.isMarked);
      if (isRowWinning) return row;
    }

    // columns now
    for (let i = 0; i < board[0].length; i++) {
      const column = getColumnFromBoard(board, i);
      const isColumnWinning = column.every((element) => element.isMarked);
      if (isColumnWinning) return column;
    }
    return false;
  };

  const drawNumber = (board, n) => {
    // mark all numbers of a board of value n as isMarked, and return the updated board
    return board.map((row) =>
      row.map((element) => {
        if (element.val == n) {
          return { ...element, isMarked: true };
        } else {
          return element;
        }
      })
    );
  };

  const play = () => {
    // now we need to play the game to figure out which board wins first
    for (let i = 0; i < numbers.length; i++) {
      // we play by parcouring the array of drawn numbers
      const drawnNumber = numbers[i];
      // we update the boards
      formattedArr = formattedArr.map((board) =>
        drawNumber(board, drawnNumber)
      );
      // then we check if a board is winning
      let winner;
      for (let board of formattedArr) {
        const winningCombinaison = checkBoardIfWinning(board);
        if (winningCombinaison) {
          winner = { board, winningCombinaison, drawnNumber };
        }
      }
      if (winner) {
        // we found a winner !
        return winner;
      } else {
        // console.log("no winner yet, we continue", drawnNumber, formattedArr[0]);
      }
    }
  };

  const calculateScore = (board, lastNumber) => {
    const unmarkedSum = board
      .map((row) =>
        row.reduce((acc, curr) => {
          return !curr.isMarked ? (acc += curr.val) : acc;
        }, 0)
      )
      .reduce((acc, curr) => {
        return acc + curr;
      }, 0);
    return lastNumber * unmarkedSum;
  };

  const winner = play();
  const score = calculateScore(winner.board, winner.drawnNumber);

  // console.log("SCORE:", score);
});

// -----------
// PART 2: https://adventofcode.com/2021/day/4#part2

fs.readFile("4_input.txt", "utf-8", (err, data) => {
  if (err) throw err;
  const strBoards = data.split("\n\n").map((board) => board.split("\n"));
  const arrBoards = strBoards.map((board) =>
    board
      .map((row) => {
        return row
          .replace(/\s\s+/g, " ")
          .split(" ")
          .filter((element) => element != "");
      })
      .filter((element) => element != null)
  );
  // arrBoards is an array boards; a board is an array of array of rows
  /*
  [
    [ '42', '57', '40', '73', '32' ],
    [ '70', '79', '80', '11', '67' ],
    [ '55', '26', '87', '92', '19' ],
    [ '63', '58', '78', '29', '77' ],
    [ '17', '74', '18', '20', '60' ]
  ]
  */
  let formattedArr = arrBoards.map((board) =>
    board.map((row) =>
      row.map((element) => {
        return { val: parseInt(element), isMarked: false };
      })
    )
  );

  const getColumnFromBoard = (board, column) => {
    // return an array of values corresponding to the column column of a board
    const res = [];
    for (let row of board) {
      res.push(row[column]);
    }
    return res;
  };

  const checkBoardIfWinning = (board) => {
    // we need to check rows and columns
    // row first
    for (let row of board) {
      const isRowWinning = row.every((element) => element.isMarked);
      if (isRowWinning) return row;
    }

    // columns now
    for (let i = 0; i < board[0].length; i++) {
      const column = getColumnFromBoard(board, i);
      const isColumnWinning = column.every((element) => element.isMarked);
      if (isColumnWinning) return column;
    }
    return false;
  };

  const drawNumber = (board, n) => {
    // mark all numbers of a board of value n as isMarked, and return the updated board
    return board.map((row) =>
      row.map((element) => {
        if (element.val == n) {
          return { ...element, isMarked: true };
        } else {
          return element;
        }
      })
    );
  };

  const play = () => {
    // now we need to play the game to figure out which board wins last
    // we'll keep track in which boards have won in a new array
    let gameState = arrBoards.map((_board) => false);

    for (let i = 0; i < numbers.length; i++) {
      // we play by parcouring the array of drawn numbers
      const drawnNumber = numbers[i];
      // we update the boards
      formattedArr = formattedArr.map((board) =>
        drawNumber(board, drawnNumber)
      );
      // then we check if a board is winning
      let winner;
      for (let [index, board] of formattedArr.entries()) {
        if (gameState[index] !== true) {
          const winningCombinaison = checkBoardIfWinning(board);
          if (winningCombinaison) {
            // we found a winner !
            winner = { board, winningCombinaison, drawnNumber };
            // let's update the gameState
            gameState[index] = true;
          }
        }
      }

      if (winner) {
        // then, if it's the last one, we return it; if not, then we continue playing
        const isLastWinningBoard = gameState.every((v) => v === true);
        console.log("isLastWinningBoard", isLastWinningBoard, winner);
        if (isLastWinningBoard) {
          console.log("WIN");
          return winner;
        }
      } else {
        // console.log("no winner yet, we continue", drawnNumber, formattedArr[0]);
      }
    }
  };

  const calculateScore = (board, lastNumber) => {
    const unmarkedSum = board
      .map((row) =>
        row.reduce((acc, curr) => {
          return !curr.isMarked ? (acc += curr.val) : acc;
        }, 0)
      )
      .reduce((acc, curr) => {
        return acc + curr;
      }, 0);
    return lastNumber * unmarkedSum;
  };

  const winner = play();
  const score = calculateScore(winner.board, winner.drawnNumber);

  console.log("SCORE #2:", score);
});
