import React, { useEffect } from 'react';
import Draggable from 'react-draggable';
import highlighter from '../utils/highlighter';

interface Props {
  movesCount: number;
  highlightedSquares: Array<String>;
  setHighlightedSquares: any;
  currentPieces: any;
  setNewPieces: any;
  currentPiece: string;
}

const Piece = ({
  movesCount,
  highlightedSquares,
  setHighlightedSquares,
  currentPieces,
  setNewPieces,
  currentPiece,
}: Props) => {
  const boardOffsetTop: any = document.getElementById('thechess')?.offsetTop;
  const boardOffsetLeft: any = document.getElementById('thechess')?.offsetLeft;

  const pieceRef: any = React.createRef();
  const letterArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const getDiff: any = (
    x: any,
    y: any
    // squareHeight: number
  ): string => {
    // eslint-disable-next-line no-debugger
    debugger;
    const xDiff = Math.floor(x / 75);
    const yDiff = 8 - Math.floor(y / 75);
    return `${letterArray[xDiff]}${yDiff}`;
  };

  useEffect(() => {
    // Update the document title using the browser API
  });

  const onStart = (e: any, position: any) => {
    const pieceName: string = pieceRef.current.id;
    const fromWhichSquare: string = position.node.offsetParent.id;

    const legalTurn =
      (pieceName[0] === 'W' && movesCount % 2 === 0) ||
      (pieceName[0] === 'B' && movesCount % 2 === 1);
    if (legalTurn) {
      const squaresToHighlight = highlighter(
        currentPiece,
        fromWhichSquare,
        currentPieces
      );
      setHighlightedSquares(squaresToHighlight);
    }
    console.log(
      `You currently moving ${pieceName} piece \nFrom ${fromWhichSquare} square.`
    );
  };

  const onStop = ({ clientX, clientY }: any, position: any) => {
    const pieceNode = pieceRef.current;
    const pieceName: string = pieceNode.id;
    const squareHeight: number = pieceNode.offsetParent.clientHeight;
    const fromWhichSquare: string = position.node.offsetParent.id;
    const toWhichSquare: string = getDiff(
      clientX - boardOffsetLeft,
      clientY - boardOffsetTop,
      fromWhichSquare,
      squareHeight
    );
    const isLegalStep: any = highlightedSquares.find(
      (element) => element === toWhichSquare
    );
    console.log({ highlightedSquares, isLegalStep, toWhichSquare });
    if (currentPieces[toWhichSquare]?.startsWith(pieceName[0])) {
      console.log('You try capturing your own piece');
      setNewPieces(pieceName, fromWhichSquare, fromWhichSquare);
    } else if (isLegalStep) {
      if (
        (pieceName.endsWith('P') && toWhichSquare.endsWith('8')) ||
        toWhichSquare.endsWith('1') // Promote to queen
      ) {
        const queenPiece = `${pieceName[0]}Q`;
        setNewPieces(queenPiece, fromWhichSquare, toWhichSquare);
      } else {
        setNewPieces(pieceName, fromWhichSquare, toWhichSquare);
      }
    } else {
      console.log('You moved illegaly');
      setNewPieces(pieceName, fromWhichSquare, fromWhichSquare);
    }
    setHighlightedSquares([]);
  };
  return (
    <Draggable onStart={onStart} onStop={onStop}>
      <div
        id={currentPiece}
        ref={pieceRef}
        className={`${currentPiece ? `piece piece-${currentPiece}` : ''}`}
      />
    </Draggable>
  );
};

export default Piece;
