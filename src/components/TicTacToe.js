import React, { useState, useEffect } from "react";

const winConditions = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["1", "5", "9"],
  ["3", "5", "7"],
];

const TicTacToe = () => {
  const [squares, setSquares] = useState({
    x: [],
    o: [],
  });

  const [open, setOpen] = useState([
    "1", "2", "3", "4", "5", "6", "7", "8", "9"
  ])

  useEffect(() => {
    checkWin()
    if (open.length == 0) {
      alert('Tie game!')
      setSquares({
        x: [],
        o: [],
      })
      setOpen([
        "1", "2", "3", "4", "5", "6", "7", "8", "9"
      ])
    } else if (open.length !== 9) {
      getCompMove()
    }
  }, [squares.x])

  const displayHelper = (id) => {
    if (squares.x.includes(id)) {
      return "X";
    } else if (squares.o.includes(id)) {
      return "O";
    } else {
      return "";
    }
  };

  const checkWin = () => {
      for (const i in winConditions) {
        if (
          squares.x.includes(winConditions[i][0]) &&
          squares.x.includes(winConditions[i][1]) &&
          squares.x.includes(winConditions[i][2])
        ) {
          alert ("You win!")
          setSquares({x:[], o:[]})
          break
        }
      }
  }

  const canBlock = () => {
    for (const i in winConditions) {
      const [a, b, c] = winConditions[i]
      if (squares.x.includes(a) && squares.x.includes(b)) {
        if (!squares.o.includes(c)) {
          return c
        }
      }
      if (squares.x.includes(b) && squares.x.includes(c)) {
        if (!squares.o.includes(a)) {
          return a
        }
      }
      if (squares.x.includes(a) && squares.x.includes(c)) {
        if (!squares.o.includes(b)) {
          return b
        }
      }
    }
    return false
  }

  const canWin = () => {
    for (const i in winConditions) {
      const [a, b, c] = winConditions[i]
      if (squares.o.includes(a) && squares.o.includes(b)) {
        if (!squares.x.includes(c)) {
          return c
        }
      }
      if (squares.o.includes(b) && squares.o.includes(c)) {
        if (!squares.x.includes(a)) {
          return a
        }
      }
      if (squares.o.includes(a) && squares.o.includes(c)) {
        if (!squares.x.includes(b)) {
          return b
        }
      }
    }
    return false
  }

  const getCompMove = () => {
    let move = canWin()
    if (move) {
      alert("Computer wins!")
      setSquares({x:[], o:[]})
      setOpen([
        "1", "2", "3", "4", "5", "6", "7", "8", "9"
      ])
      return
    } 
    move = canBlock()
    if (move) {
      setSquares({ ...squares, o: [...squares.o, move] });
      setOpen(open.filter(el => el !== move))
      return
    }
    move = open[Math.floor(Math.random() * open.length)]
    setSquares({ ...squares, o: [...squares.o, move] });
    setOpen(open.filter(el => el !== move))
  }

  const clickHandler = (e) => {
    const squareId = e.target.dataset.value;
    if (squares.x.includes(squareId) || squares.o.includes(squareId)) {
      alert("You must select an empty square");
    } else {
      setSquares({ ...squares, x: [...squares.x, squareId] });
      setOpen(open.filter(el => el !== squareId))
    }
  };

  return (
    <div className="tictactoe">
      <div className="row row1">
        <div className="box box1" data-value={1} onClick={clickHandler}>
          {displayHelper("1")}
        </div>
        <div className="box box2" data-value={2} onClick={clickHandler}>
          {displayHelper("2")}
        </div>
        <div className="box box3" data-value={3} onClick={clickHandler}>
          {displayHelper("3")}
        </div>
      </div>

      <div className="row row2">
        <div className="box box4" data-value={4} onClick={clickHandler}>
          {displayHelper("4")}
        </div>
        <div className="box box5" data-value={5} onClick={clickHandler}>
          {displayHelper("5")}
        </div>
        <div className="box box6" data-value={6} onClick={clickHandler}>
          {displayHelper("6")}
        </div>
      </div>

      <div className="row row3">
        <div className="box box7" data-value={7} onClick={clickHandler}>
          {displayHelper("7")}
        </div>
        <div className="box box8" data-value={8} onClick={clickHandler}>
          {displayHelper("8")}
        </div>
        <div className="box box9" data-value={9} onClick={clickHandler}>
          {displayHelper("9")}
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
