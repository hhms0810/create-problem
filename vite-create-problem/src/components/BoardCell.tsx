import { Coord } from '../utils/cell.util';

interface BoardCellProps {
  coord: Coord;
  num: number;
  candidates: boolean[];
  setNumberInCell: (coord: Coord, num: number) => void;
}

export const BoardCell = ({ coord, num, candidates, setNumberInCell }: BoardCellProps) => {
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
            <div
              className="text-xs"
              key={`candidates-${i}`}
              onClick={() => {
                if (candidate) {
                  setNumberInCell(coord, i + 1);
                }
              }}
            >
              {candidate ? i + 1 : '-'}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
