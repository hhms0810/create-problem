import { BoardCell } from './BoardCell';
import { useBoard } from '../utils/board.util';
// import level1 from '../assets/problems/level1/398683497.json';
// import level2 from '../assets/problems/level2/139914293.json';
// import level3 from '../assets/problems/level3/5482683914.json';
import level4 from '../assets/problems/level4/5226551585.json';
import { useEffect } from 'react';

interface BoardProps {}

export const Board = ({}: BoardProps) => {
  const {
    boardData,
    filledCellCount,
    setRandomNumberInCell,
    setNumberInCell,
    startCreateProblem,
    stopCreateProblem,
  } = useBoard();
  const problem = level4;

  useEffect(() => {
    if (problem) {
      problem.forEach((row, y) =>
        row.forEach((num, x) => {
          if (num) {
            setNumberInCell({ y, x }, num, false);
          }
        })
      );
    }
  }, []);

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
