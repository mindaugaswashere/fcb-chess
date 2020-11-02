const highlighter = (piece: string, square: string, currentPieces: [string]) => {
  const line = parseInt(square[1], 10);
  const letterCharCode: number = square[0].charCodeAt(0);

  const leftCharCode: number = 65;
  const rightCharCode: number = 72;
  const upCharCode: number = 8;
  const downCharCode: number = 1;

  const squaresToHighlight: Array<string> = [];

  const lineArray = (): Array<string> => {
    const coords = [];
    for (let i: number = line + 1; i <= upCharCode; i += 1) {
      const forwardSquare: any = `${square[0]}${i}`;
      if (currentPieces[forwardSquare] == null) {
        coords.push(forwardSquare);
      } else if (!currentPieces[forwardSquare].startsWith(piece[0])) {
        coords.push(forwardSquare);
        break;
      } else break;
    }

    for (let i: number = line - 1; i >= downCharCode; i -= 1) {
      const downSquare: any = `${square[0]}${i}`;
      if (currentPieces[downSquare] === null) {
        coords.push(downSquare);
      } else if (!currentPieces[downSquare].startsWith(piece[0])) {
        coords.push(downSquare);
        break;
      } else break;
    }

    for (let i: number = letterCharCode - 1; i >= leftCharCode; i -= 1) {
      const leftSquare: any = `${String.fromCharCode(i)}${square[1]}`;
      if (currentPieces[leftSquare] === null) {
        coords.push(leftSquare);
      } else if (!currentPieces[leftSquare].startsWith(piece[0])) {
        coords.push(leftSquare);
        break;
      } else break;
    }

    for (let i: number = letterCharCode + 1; i <= rightCharCode; i += 1) {
      const rightSquare: any = `${String.fromCharCode(i)}${square[1]}`;
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
    const coords = [];
    let modifier = 1;
    for (let i: number = line + 1; i <= upCharCode; i += 1) {
      const upperLeftLetter = String.fromCharCode(letterCharCode - modifier);
      const forwardLeftSquare: any = `${upperLeftLetter}${i}`;
      if (letterCharCode - modifier < leftCharCode) break;
      else {
        modifier += 1;
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
      const upperRightSquare: any = `${upperRightLetter}${i}`;
      if (letterCharCode + modifier > rightCharCode) break;
      else {
        modifier += 1;
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
      const downLeftSquare: any = `${downLeftLetter}${i}`;
      if (letterCharCode - modifier < leftCharCode) {
        break;
      } else {
        modifier += 1;
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
      const downRightSquare: any = `${downRightLetter}${i}`;

      if (letterCharCode + modifier > rightCharCode || i < downCharCode) {
        break;
      } else {
        modifier += 1;
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
    case 'WN' || 'BN': {
      const isLegal = (checkableSquare: any) => {
        const color = piece[0];
        const squarestate = currentPieces[checkableSquare];
        return !squarestate?.startsWith(color);
      };
      let reachUp = false;
      let reachUpPre = false;

      let reachDown = false;
      let reachDownPre = false;

      let reachLeft = false;
      let reachLeftPre = false;

      let reachRight = false;
      let reachRightPre = false;

      if (line <= upCharCode - 1) {
        reachUpPre = true;
        if (line <= upCharCode - 2) {
          reachUp = true;
        }
      }

      if (line >= downCharCode + 1) {
        reachDownPre = true;
        if (line >= downCharCode + 2) {
          reachDown = true;
        }
      }

      if (letterCharCode >= leftCharCode + 1) {
        reachLeftPre = true;
        if (letterCharCode >= leftCharCode + 2) {
          reachLeft = true;
        }
      }

      if (letterCharCode <= rightCharCode - 1) {
        reachRightPre = true;
        if (letterCharCode <= rightCharCode - 2) {
          reachRight = true;
        }
      }

      if (reachUp) {
        if (reachRightPre) {
          const letter = String.fromCharCode(letterCharCode + 1);
          const squareToHighlight = `${letter}${line + 2}`;
          if (isLegal(squareToHighlight)) {
            squaresToHighlight.push(squareToHighlight);
          }
        }

        if (reachLeftPre) {
          const letter = String.fromCharCode(letterCharCode - 1);
          const squareToHighlight = `${letter}${line + 2}`;
          if (isLegal(squareToHighlight)) {
            squaresToHighlight.push(squareToHighlight);
          }
        }
      }

      if (reachDown) {
        if (reachRightPre) {
          const letter = String.fromCharCode(letterCharCode + 1);
          const squareToHighlight = `${letter}${line - 2}`;
          if (isLegal(squareToHighlight)) {
            squaresToHighlight.push(squareToHighlight);
          }
        }

        if (reachLeftPre) {
          const letter = String.fromCharCode(letterCharCode - 1);
          const squareToHighlight = `${letter}${line - 2}`;
          if (isLegal(squareToHighlight)) {
            squaresToHighlight.push(squareToHighlight);
          }
        }
      }

      if (reachLeft) {
        if (reachUpPre) {
          const letter = String.fromCharCode(letterCharCode - 2);
          const squareToHighlight = `${letter}${line + 1}`;
          if (isLegal(squareToHighlight)) {
            squaresToHighlight.push(`${letter}${line + 1}`);
          }
        }
        if (reachDownPre) {
          const letter = String.fromCharCode(letterCharCode - 2);
          const squareToHighlight = `${letter}${line - 1}`;
          if (isLegal(squareToHighlight)) {
            squaresToHighlight.push(squareToHighlight);
          }
        }
      }

      if (reachRight) {
        if (reachUpPre) {
          const letter = String.fromCharCode(letterCharCode + 2);
          const squareToHighlight = `${letter}${line + 1}`;
          if (isLegal(squareToHighlight)) {
            squaresToHighlight.push(squareToHighlight);
          }
        }
        if (reachDownPre) {
          const letter = String.fromCharCode(letterCharCode + 2);
          const squareToHighlight = `${letter}${line - 1}`;
          if (isLegal(squareToHighlight)) {
            squaresToHighlight.push(squareToHighlight);
          }
        }
      }

      return squaresToHighlight;
    }

    case 'WP' || 'BP': {
      const modifier = piece === 'WP' ? 1 : -1;
      const forwardCoord: any = `${square[0]}${
        parseInt(square[1], 10) + modifier
      }`;
      const diagonalCoordLeft =
        String.fromCharCode(letterCharCode - modifier) +
        (parseInt(square[1], 10) + modifier);
      const diagonalCoordRight =
        String.fromCharCode(letterCharCode + modifier) +
        (parseInt(square[1], 10) + modifier);
      // Checks if diagonal contain
      const isDiagonalAvailable = (coord: any, color: string) => {
        if (
          currentPieces[coord] === null ||
          currentPieces[coord][0].startsWith(color)
        ) {
          return false;
        }
        return true;
      };
      const isOnLeftEdge = letterCharCode > leftCharCode;
      if (isOnLeftEdge) {
        const diagonal =
          piece === 'WP' ? diagonalCoordLeft : diagonalCoordRight;
        if (isDiagonalAvailable(diagonal, piece[0])) {
          squaresToHighlight.push(diagonal);
        }
      }

      const isOnRightEdge = letterCharCode < rightCharCode;
      if (isOnRightEdge) {
        const diagonal =
          piece === 'WP' ? diagonalCoordRight : diagonalCoordLeft;
        if (isDiagonalAvailable(diagonal, piece[0])) {
          squaresToHighlight.push(diagonal);
        }
      }

      const isForwardEmpty: boolean = currentPieces[forwardCoord] === null;
      if (isForwardEmpty) squaresToHighlight.push(forwardCoord);
      const forward1: any = `${square[0]}${parseInt(square[1], 10) + modifier}`;

      if (square.endsWith('2') && piece === 'WP') {
        const forward2: any = `${square[0]}${
          parseInt(square[1], 10) + 2 * modifier
        }`;
        if (
          currentPieces[forward1] === null &&
          currentPieces[forward2] === null
        ) {
          squaresToHighlight.push(forward2);
        }
        return squaresToHighlight;
      } if (
        currentPieces[forward1] === null &&
        square.endsWith('7') &&
        piece.startsWith('B')
      ) {
        const forward2: any = `${square[0]}${
          parseInt(square[1], 10) + 2 * modifier
        }`;
        if (currentPieces[forward2] === null) {
          squaresToHighlight.push(forward2);
        }
        return squaresToHighlight;
      }

      return squaresToHighlight;
    }

    case 'WR' || 'BR': {
      return lineArray();
    }

    case 'WB' || 'BB': {
      return diagonalArray();
    }

    case 'WQ' || 'BQ': {
      return [...lineArray(), ...diagonalArray()];
    }

    case 'WK' || 'BK': {
      const isNearby = (
        highlightedLetter: string,
        highlightedLine: number
      ) => {
        const highlightedLetterCode = highlightedLetter.charCodeAt(0);
        for (let i = -1; i <= 1; i += 1) {
          for (let j = -1; j <= 1; j += 1) {
            if (
              line + i === highlightedLine &&
              letterCharCode + j === highlightedLetterCode
            ) {
              return true;
            }
          }
        }
        return false;
      };

      const filtered = [
        ...lineArray(),
        ...diagonalArray(),
      ].filter((highlightedSquare) => isNearby(
        highlightedSquare[0],
        parseInt(highlightedSquare[1], 10)
      ));

      return filtered;
    }

    default: {
      console.log('Moved with other piece, coming soon');
    }
  }

  return [];
};

export default highlighter;
