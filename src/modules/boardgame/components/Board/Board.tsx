import {useState} from "react";
import {constructBoardWithShips, isHit} from "../../utils";
import {Board, Ship} from "../../models";
import {useKonamiCode} from "../../hooks";
import styles from "./Board.module.css"
import {BoardGrid} from "./BoardGrid";
import {CONSTANTS} from "../../constants";

const ships: Ship[] = [
    { length: 5 },
    { length: 4 },
    { length: 4 }
];

export const BoardComponent = () => {
    const [board, setBoard] = useState(constructBoardWithShips(ships));
    const [isCheating, setIsCheating] = useState(false);
    const [hits, setHits] = useState(0);

    useKonamiCode(() => {setIsCheating(true)});

    const setMovement = (userChosenRow: number, userChosenCol: number) => {
        const hit = isHit(board, userChosenRow, userChosenCol);

        setBoard((prevState: Board) => {
            const newBoard = [...prevState];
            const rowToUpdate = newBoard[userChosenRow];
            setHits((prevState) => hit ? prevState + 1 : prevState);
            rowToUpdate[userChosenCol] = hit ? CONSTANTS.HIT : CONSTANTS.MISS;

            return newBoard;
        })
    }

    const resetGame = () => {
        setHits(0);
        setBoard(constructBoardWithShips(ships));
        setIsCheating(false);
    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.board}>
                {hits === CONSTANTS.GAME_OVER_SHITS && <div className={styles.gameover}><img height={500} src={"gameover.png"} /> </div>}
                <BoardGrid board={board} isCheating={isCheating} clickCell={setMovement}/>
            </div>
            <button className={styles.retryButton} onClick={resetGame}>Try again</button>
        </div>
        )
}