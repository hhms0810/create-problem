import { BoardCell } from './BoardCell';
import { useBoard } from '../utils/board.util';

interface BoardProps {}

export const Board = ({}: BoardProps) => {
  const {
    boardData,
    filledCellCount,
    setRandomNumberInCell,
    startCreateProblem,
    stopCreateProblem,
    setNumberInCell,
  } = useBoard();

  return (
    <>
      <div className="container">
        <div>
          {boardData.map((row, y) => (
            <div className="flex" key={`row-${y}`}>
              {row.map((cell, x) => (
                <BoardCell
                  key={`cell-[${y}, ${x}]`}
                  coord={{ y, x }}
                  num={cell.num}
                  candidates={cell.candidates}
                  setNumberInCell={setNumberInCell}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <button onClick={setRandomNumberInCell}>Random</button>
        <button onClick={startCreateProblem}>Start</button>
        <button onClick={stopCreateProblem}>Stop</button>
      </div>
      <div>{filledCellCount}</div>
    </>
  );
};
