import {Board} from "../../../models";
import {FC, useMemo} from "react";
import styles from "./BoardGrid.module.css"

interface BoardGridProps {
    board: Board;
    clickCell: (rowIndex: number, colIndex: number) => void;
    isCheating: boolean;
}

const impactImage = <img alt='impact' src={"impact.png"} />;
const splashImage = <img alt='splash' className={styles.cellImage} src={"splash.jpeg"} />;

export const BoardGrid: FC<BoardGridProps> = ({board, clickCell, isCheating}) => {
    const printCellValue = useMemo(() => {
        return (isCheating: boolean, cellValue: string) => {
            switch (cellValue) {
                case 'Ship':
                    return isCheating ? cellValue : '';
                case 'X':
                    return impactImage
                case 'O':
                    return splashImage
            }
        }
    }, [impactImage, splashImage])

    return (
        <>
            {board.map((row: string[], rowIndex: number) => {
                return (<div className={styles.row} key={rowIndex}>
                    {row.map((column: string, colIndex: number) => {
                        return <div className={styles.cell}
                                    key={`${rowIndex}-${colIndex}`}
                                    onClick={() => clickCell(rowIndex, colIndex)}>
                            {printCellValue(isCheating, column)}
                        </div>
                    })}
                </div>)
            })}
        </>
    )
}