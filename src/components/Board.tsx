import React, { useState } from "react";
import Square from "./Square";
// import ChessInit from './../utils/chess-init.json';
import { colorArray, coordArray } from "./../utils/coordinates";
import InitialPieces from "./../utils/initialPosition.json";
import "./../assets/styles/board.css";
const Board = () => {
  const [currentPieces, setCurrentPieces]: any = useState(InitialPieces);
  const [highlightedSquares, setHighlightedSquares] = useState([]);
  const setNewPieces: any = (
    piece: string = "BP",
    from: string = "B1",
    to: string = "C5"
  ) => {
    const pieceCopy = currentPieces;
    pieceCopy[from] = null;
    pieceCopy[to] = piece;
    if (from === to) {
      setCurrentPieces({});
    }
    setCurrentPieces({ ...pieceCopy });
  };
  const colorArr: any = colorArray();

  return (
    <div className="board-main" id="thechess">
      {colorArr.map((color: string, i: number) => {
        const currentCoord = coordArray()[i];
        let currentColor = color;
        if (currentCoord === highlightedSquares.find((e) => e === currentCoord))
          currentColor = currentColor + "h";
        return (
          <Square
            highlightedSquares={highlightedSquares}
            setHighlightedSquares={setHighlightedSquares}
            currentPieces={currentPieces}
            key={i}
            id={currentCoord}
            color={currentColor}
            piece={currentPieces[currentCoord]}
            setNewPieces={setNewPieces}
          />
        );
      })}
    </div>
  );
};
export default Board;
