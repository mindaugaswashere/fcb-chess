import React, { useEffect } from "react";
import Draggable from "react-draggable";

interface Props {
	highlightedSquares: Array<String>;
	setHighlightedSquares: any;
	currentPieces: any;
	setNewPieces: any;
	piece: string;
}

const Piece = ({
	highlightedSquares,
	setHighlightedSquares,
	currentPieces,
	setNewPieces,
	piece,
}: Props) => {
	const boardOffsetTop: any = document.getElementById("thechess")?.offsetTop;
	//const boarder: any = document.getElementById("thechess")
	const boardOffsetLeft: any = document.getElementById("thechess")?.offsetLeft;

	const pieceRef: any = React.createRef();
	const letterArray = ["A", "B", "C", "D", "E", "F", "G", "H"];
	const getDiff: any = (
		x: any,
		y: any,
		fromSquare: any,
		squareHeight: number
	): string => {
		const xDiff = Math.floor(x / 75);
		const yDiff = 8 - Math.floor(y / 75);
		return `${letterArray[xDiff]}${yDiff}`;
	};

	const highlighter = (piece: string, square: string) => {
		const letterCharCode: number = square[0].charCodeAt(0);
		const leftCharCode: number = 65;
		const rightCharCode: number = 72;
		const upCharCode: number = 8;
		const downCharCode: number = 1;
		const squaresToHighlight: Array<string> = [];

		const lineArray = (): Array<string> => {
			const line = parseInt(square[1], 10);
			let coords = [];

			for (let i: number = line + 1; i <= upCharCode; i += 1) {
				const forwardSquare: string = `${square[0]}${i}`;
				if (currentPieces[forwardSquare] === null) {
					coords.push(forwardSquare);
				} else if (!currentPieces[forwardSquare].startsWith(piece[0])) {
					coords.push(forwardSquare);
					break;
				} else break;
			}

			for (let i: number = line - 1; i >= downCharCode; i -= 1) {
				const downSquare: string = `${square[0]}${i}`;
				if (currentPieces[downSquare] === null) {
					coords.push(downSquare);
				} else if (!currentPieces[downSquare].startsWith(piece[0])) {
					coords.push(downSquare);
					break;
				} else break;
			}

			for (let i: number = letterCharCode - 1; i >= leftCharCode; i -= 1) {
				const leftSquare: string = `${String.fromCharCode(i)}${square[1]}`;
				if (currentPieces[leftSquare] === null) {
					coords.push(leftSquare);
				} else if (!currentPieces[leftSquare].startsWith(piece[0])) {
					coords.push(leftSquare);
					break;
				} else break;
			}

			for (let i: number = letterCharCode + 1; i <= rightCharCode; i += 1) {
				const rightSquare: string = `${String.fromCharCode(i)}${square[1]}`;
				if (currentPieces[rightSquare] === null) {
					coords.push(rightSquare);
				} else if (!currentPieces[rightSquare].startsWith(piece[0])) {
					coords.push(rightSquare);
					break;
				} else break;
			}

			return coords;
		};

		const diagonalArray = (): Array<string> => {
			const line = parseInt(square[1], 10);
			let coords = [];
			let modifier = 1;
			for (let i: number = line + 1; i <= upCharCode; i += 1) {
				const upperLeftLetter = String.fromCharCode(letterCharCode - modifier);
				const forwardLeftSquare: string = `${upperLeftLetter}${i}`;
				if (letterCharCode - modifier < leftCharCode) break;
				else {
					modifier++;
					if (currentPieces[forwardLeftSquare] === null) {
						coords.push(forwardLeftSquare);
					} else if (!currentPieces[forwardLeftSquare].startsWith(piece[0])) {
						coords.push(forwardLeftSquare);
						break;
					} else break;
				}
			}
			modifier = 1;

			for (let i: number = line + 1; i <= upCharCode; i += 1) {
				const upperRightLetter = String.fromCharCode(letterCharCode + modifier);
				const upperRightSquare: string = `${upperRightLetter}${i}`;
				if (letterCharCode + modifier > rightCharCode) break;
				else {
					modifier++;
					if (currentPieces[upperRightSquare] === null) {
						coords.push(upperRightSquare);
					} else if (!currentPieces[upperRightSquare].startsWith(piece[0])) {
						coords.push(upperRightSquare);
						break;
					} else break;
				}
			}

			modifier = 1;

			for (let i: number = line - 1; i >= downCharCode; i -= 1) {
				const downLeftLetter = String.fromCharCode(letterCharCode - modifier);
				const downLeftSquare: string = `${downLeftLetter}${i}`;
				if (letterCharCode - modifier < leftCharCode) {
					break;
				} else {
					modifier++;
					if (currentPieces[downLeftSquare] === null) {
						coords.push(downLeftSquare);
					} else if (!currentPieces[downLeftSquare].startsWith(piece[0])) {
						coords.push(downLeftSquare);
						break;
					} else break;
				}
			}

			modifier = 1;

			for (let i: number = line - 1; i >= downCharCode; i -= 1) {
				const downRightLetter = String.fromCharCode(letterCharCode + modifier);
				const downRightSquare: string = `${downRightLetter}${i}`;

				if (letterCharCode + modifier > rightCharCode || i < downCharCode) {
					break;
				} else {
					modifier++;
					if (currentPieces[downRightSquare] === null) {
						coords.push(downRightSquare);
					} else if (!currentPieces[downRightSquare].startsWith(piece[0])) {
						coords.push(downRightSquare);
						break;
					} else break;
				}
			}
			return coords;
		};

		switch (piece) {
			case "WP": {
				console.log("Moved with White pawn");
				const forwardCoord: string = `${square[0]}${
					parseInt(square[1], 10) + 1
				}`;
				let diagonalCoordLeft: string =
					String.fromCharCode(letterCharCode - 1) +
					(parseInt(square[1], 10) + 1);
				let diagonalCoordRight: string =
					String.fromCharCode(letterCharCode + 1) +
					(parseInt(square[1], 10) + 1);

				// Checks if diagonal contain
				const isDiagonalAvailable = (coord: string, color: String) => {
					if (
						currentPieces[coord] === null ||
						currentPieces[coord][0].startsWith(color)
					) {
						return false;
					} else {
						return true;
					}
				};

				if (letterCharCode > leftCharCode) {
					if (isDiagonalAvailable(diagonalCoordLeft, piece[0])) {
						squaresToHighlight.push(diagonalCoordLeft);
					}
				}

				if (letterCharCode < rightCharCode) {
					if (isDiagonalAvailable(diagonalCoordRight, piece[0])) {
						squaresToHighlight.push(diagonalCoordRight);
					}
				}

				const isForwardEmpty: boolean = currentPieces[forwardCoord] === null;
				if (isForwardEmpty) squaresToHighlight.push(forwardCoord);

				if (square.endsWith("2")) {
					const forward2 = `${square[0]}${parseInt(square[1], 10) + 2}`;
					squaresToHighlight.push(forward2);
					setHighlightedSquares(squaresToHighlight);
				}

				setHighlightedSquares(squaresToHighlight);
				break;
			}

			case "WR":
			case "BR":
				setHighlightedSquares(lineArray());
				break;

			case "WB":
			case "BB":
				setHighlightedSquares(diagonalArray());
				break;

			case "WQ":
			case "BQ":
				setHighlightedSquares([...lineArray(), ...diagonalArray()]);
				break;

			case "WK": {
				const line = parseInt(square[1], 10);
				let coords = [];

				for (let i: number = line + 1; i <= upCharCode; i += 1) {
					const forwardSquare: string = `${square[0]}${i}`;
					if (currentPieces[forwardSquare] === null) {
						coords.push(forwardSquare);
					} else if (!currentPieces[forwardSquare].startsWith(piece[0])) {
						coords.push(forwardSquare);
						break;
					} else break;
				}

				for (let i: number = line - 1; i >= downCharCode; i -= 1) {
					const downSquare: string = `${square[0]}${i}`;
					if (currentPieces[downSquare] === null) {
						coords.push(downSquare);
					} else if (!currentPieces[downSquare].startsWith(piece[0])) {
						coords.push(downSquare);
						break;
					} else break;
				}

				for (let i: number = letterCharCode - 1; i >= leftCharCode; i -= 1) {
					const leftSquare: string = `${String.fromCharCode(i)}${square[1]}`;
					if (currentPieces[leftSquare] === null) {
						coords.push(leftSquare);
					} else if (!currentPieces[leftSquare].startsWith(piece[0])) {
						coords.push(leftSquare);
						break;
					} else break;
				}

				for (let i: number = letterCharCode + 1; i <= rightCharCode; i += 1) {
					const rightSquare: string = `${String.fromCharCode(i)}${square[1]}`;
					if (currentPieces[rightSquare] === null) {
						coords.push(rightSquare);
					} else if (!currentPieces[rightSquare].startsWith(piece[0])) {
						coords.push(rightSquare);
						break;
					} else break;
				}
				setHighlightedSquares(coords);
				break;
			}
			case "BP":
				console.log("Moved with Black pawn");
				break;
			default:
				console.log("Moved with other piece, coming soon");
				break;
		}
	};

	useEffect(() => {
		// Update the document title using the browser API
	});
	const onStart = (e: any, position: any) => {
		const pieceName: string = pieceRef.current.id;
		const fromWhichSquare: string = position.node.offsetParent.id;
		highlighter(piece, fromWhichSquare);
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
		if (currentPieces[toWhichSquare]?.startsWith(pieceName[0])) {
			console.log("You try capturing your own piece");
			setNewPieces(pieceName, fromWhichSquare, fromWhichSquare);
		} else if (isLegalStep) {
			// Promote to queen
			if (pieceName.endsWith("P") && toWhichSquare.endsWith("8")) {
				console.log("You promoted to queen");
				const queenPiece = `${pieceName[0]}Q`;
				setNewPieces(queenPiece, fromWhichSquare, toWhichSquare);
			} else {
				setNewPieces(pieceName, fromWhichSquare, toWhichSquare);
			}
		} else {
			console.log("You moved illegaly");
			setNewPieces(pieceName, fromWhichSquare, fromWhichSquare);
		}
		setHighlightedSquares([]);
	};
	return (
		<Draggable onStart={onStart} onStop={onStop}>
			<div
				id={piece}
				ref={pieceRef}
				className={`${piece ? `piece piece-${piece}` : ""}`}
			/>
		</Draggable>
	);
};

export default Piece;
