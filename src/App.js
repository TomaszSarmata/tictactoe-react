import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button onClick={onSquareClick} className="square">
      {value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    const nextSquares = squares.slice();
    if (nextSquares[i] || calculateWinner(squares)) {
      return;
    }
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          onSquareClick={() => handleClick(0)}
          value={squares[0]}
        ></Square>
        <Square
          onSquareClick={() => handleClick(1)}
          value={squares[1]}
        ></Square>
        <Square
          onSquareClick={() => handleClick(2)}
          value={squares[2]}
        ></Square>
      </div>
      <div className="board-row">
        <Square
          onSquareClick={() => handleClick(3)}
          value={squares[3]}
        ></Square>
        <Square
          onSquareClick={() => handleClick(4)}
          value={squares[4]}
        ></Square>
        <Square
          onSquareClick={() => handleClick(5)}
          value={squares[5]}
        ></Square>
      </div>
      <div className="board-row">
        <Square
          onSquareClick={() => handleClick(6)}
          value={squares[6]}
        ></Square>
        <Square
          onSquareClick={() => handleClick(7)}
          value={squares[7]}
        ></Square>
        <Square
          onSquareClick={() => handleClick(8)}
          value={squares[8]}
        ></Square>
      </div>
    </>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {}

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        ></Board>
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
