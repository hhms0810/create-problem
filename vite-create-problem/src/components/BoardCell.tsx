import { Coord } from '../utils/cell.util';

interface BoardCellProps {
  coord: Coord;
  num: number;
  candidates: boolean[];
}

export const BoardCell = ({ coord, num, candidates }: BoardCellProps) => {
  return (
    <div
      className={`box-border h-12 w-12 text-center border-2 ${
        coord.x % 3 == 2 ? 'border-r-black' : ''
      } ${coord.y % 3 == 2 ? 'border-b-black' : ''}`}
    >
      {num ? (
        <span className="text-5xl">{num}</span>
      ) : (
        <div className="grid grid-cols-3">
          {candidates.map((candidate, i) => (
            <div className="text-xs" key={`candidates-${i}`}>
              {candidate ? i + 1 : '-'}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
