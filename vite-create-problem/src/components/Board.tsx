import { useState } from 'react';
import { Cell, MAX_NUM } from '../utils/Cell';
import { BoardCell } from './BoardCell';

interface BoardProps {}

export const Board = ({}: BoardProps) => {
  const [boardData, _setBoardData] = useState<Cell[][]>(
    Array.from(Array(MAX_NUM), () =>
      Array(MAX_NUM)
        .fill(null)
        .map(() => new Cell(0))
    )
  );

  return (
    <div className="container">
      <div>
        {boardData.map((row, y) => (
          <div className="flex" key={`row_${y}`}>
            {row.map((cell, x) => (
              <BoardCell key={`${x}_${y}`} x={x} y={y} num={cell.num} memos={cell.memos} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
