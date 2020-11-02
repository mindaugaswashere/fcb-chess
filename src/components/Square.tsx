import React from 'react';
import Piece from './Piece';

interface Props {
  movesCount: number;
  highlightedSquares: Array<string>;
  setHighlightedSquares: any;
  currentPieces: object;
  currentPiece: string | null;
  setNewPieces: any;
  color: string;
  id: 'string';
}
const Square = ({
  movesCount,
  highlightedSquares,
  setHighlightedSquares,
  currentPieces,
  currentPiece,
  setNewPieces,
  color,
  id,
}: Props) => (
  <div id={`${id}`} className={`chess-square color-${color}`}>
    <div className="chess-square-coord">{id}</div>
    {currentPiece ? (
      <Piece
        movesCount={movesCount}
        highlightedSquares={highlightedSquares}
        setHighlightedSquares={setHighlightedSquares}
        currentPieces={currentPieces}
        setNewPieces={setNewPieces}
        currentPiece={currentPiece}
      />
    ) : null}
  </div>
);

export default Square;
