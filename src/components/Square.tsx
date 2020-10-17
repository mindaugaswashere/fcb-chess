import React from "react";
import Piece from "./Piece";
interface Props {
	movesCount: number;
	highlightedSquares: Array<string>;
	setHighlightedSquares: any;
	currentPieces: object;
	setNewPieces: any;
	color: string;
	piece: string | null;
	id: "string";
}
const Square = ({
	movesCount,
	highlightedSquares,
	setHighlightedSquares,
	currentPieces,
	setNewPieces,
	color,
	piece,
	id,
}: Props) => {
	return (
		<div id={`${id}`} className={`chess-square color-${color}`}>
			<div className="chess-square-coord">{id}</div>
			{piece ? (
				<Piece
					movesCount={movesCount}
					highlightedSquares={highlightedSquares}
					setHighlightedSquares={setHighlightedSquares}
					currentPieces={currentPieces}
					setNewPieces={setNewPieces}
					piece={piece}
				/>
			) : null}
		</div>
	);
};
export default Square;
