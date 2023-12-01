interface BoardCellProps {
  x: number;
  y: number;
  num: number;
  memos: boolean[];
}

export const BoardCell = ({ x, y, num }: BoardCellProps) => {
  return (
    <div
      className={`box-border h-10 w-10 leading-10 text-center ${x % 3 == 2 ? 'border-r-2' : ''} ${
        y % 3 == 2 ? 'border-b-2' : ''
      }`}
    >
      {num}
    </div>
  );
};
