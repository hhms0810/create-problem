import { BoardCell } from './BoardCell';
import { useBoard } from '../utils/board.util';

interface BoardProps {}

export const Board = ({}: BoardProps) => {
  const { boardData, setRandomNumberInCell } = useBoard();

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
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <button onClick={setRandomNumberInCell}>랜덤 숫자</button>
    </>
  );
};
