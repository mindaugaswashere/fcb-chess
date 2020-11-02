import React, { useState } from 'react';
import Square from './Square';
// import ChessInit from './../utils/chess-init.json';
import { colorArray, coordArray } from '../utils/coordinates';
import InitialPieces from '../utils/initialPosition.json';
import '../assets/styles/board.css';

interface Props {
  movesCount: number;
  setMovesCount: any;
}

const Board = ({ movesCount, setMovesCount }: Props) => {
  const [currentPieces, setCurrentPieces]: any = useState(InitialPieces);
  const [highlightedSquares, setHighlightedSquares] = useState([]);
  const setNewPieces: any = (piece: string, from: string, to: string) => {
    const pieceCopy = currentPieces;
    pieceCopy[from] = null;
    pieceCopy[to] = piece;
    if (from === to) {
      setCurrentPieces({});
    } else {
      setMovesCount(movesCount + 1);
    }
    setCurrentPieces({ ...pieceCopy });
  };
  const colorArr: any = colorArray();

  return (
    <div className="board-main" id="thechess">
      {colorArr.map((color: string, i: number) => {
        const currentCoord = coordArray()[i];
        let currentColor = color;
        if (
          currentCoord === highlightedSquares.find((e) => e === currentCoord)
        ) {
          currentColor = `${currentColor}h`;
        }
        return (
          <Square
            movesCount={movesCount}
            highlightedSquares={highlightedSquares}
            setHighlightedSquares={setHighlightedSquares}
            currentPieces={currentPieces}
            key={currentCoord}
            id={currentCoord}
            color={currentColor}
            currentPiece={currentPieces[currentCoord]}
            setNewPieces={setNewPieces}
          />
        );
      })}
    </div>
  );
};
export default Board;
