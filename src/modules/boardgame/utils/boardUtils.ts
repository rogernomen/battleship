import {Ship} from "../models";
import {CONSTANTS} from "../constants";

export const constructBoardWithShips = (ships: Ship[], boardSize = 10) => {
    let newBoard = fillEmptyBoard(boardSize);
    ships.forEach((ship) => {
        newBoard = placeShip(newBoard, ship.length);
    });
    return newBoard;
};

export const isHit = (board: string[][], row: number, col: number): boolean => {
    return board[row][col] === CONSTANTS.SHIP || board[row][col] === CONSTANTS.HIT;
}

const fillEmptyBoard = (size: number): string[][] => {
    return Array(size).fill('').map(() => Array(size).fill(' '))
}

const placeShip = (board: string[][], shipLength: number): string[][] => {
    const rows = board.length;
    const cols = board[0].length;
    let isHorizontal: boolean;
    let startRow: number;
    let startCol: number;
    let isValid = false;

    while (!isValid) {
        isHorizontal = Math.random() < 0.5;
        startRow = isHorizontal ? Math.floor(Math.random() * rows) : Math.floor(Math.random() * (rows - shipLength + 1));
        startCol = isHorizontal ? Math.floor(Math.random() * (cols - shipLength + 1)) : Math.floor(Math.random() * cols);

        if (isValidPlacement(board, startRow, startCol, shipLength, isHorizontal)) {
            isValid = true;
            return board.map((row: string[], rowIndex: number) => {
                if (isHorizontal && rowIndex === startRow) {
                    return row.map((cell: string, colIndex: number) => {
                        if (colIndex >= startCol && colIndex < startCol + shipLength) {
                            return CONSTANTS.SHIP;
                        } else {
                            return cell;
                        }
                    });
                } else if (!isHorizontal && rowIndex >= startRow && rowIndex < startRow + shipLength) {
                    return row.map((cell: string, colIndex: number) => {
                        if (colIndex === startCol) {
                            return CONSTANTS.SHIP;
                        } else {
                            return cell;
                        }
                    });
                } else {
                    return row;
                }
            });
        }
    }

    return placeShip(board, shipLength);
}

function isValidPlacement(board: string[][],
                          startRow: number,
                          startCol: number,
                          length: number,
                          isHorizontal: boolean): boolean {
    const rows = board.length;
    const cols = board.length

    if (isHorizontal) {
        if (startRow < 0 || startRow >= rows || startCol < 0 || startCol + length > cols) {
            return false;
        }

        for (let col = startCol; col < startCol + length; col++) {
            if (board[startRow][col] === CONSTANTS.SHIP) {
                return false;
            }
        }
    } else {
        if (startRow < 0 || startRow + length > rows || startCol < 0 || startCol >= cols) {
            return false;
        }

        for (let row = startRow; row < startRow + length; row++) {
            if (board[row][startCol] === CONSTANTS.SHIP) {
                return false;
            }
        }
    }

    return true;
}