import { useEffect, useState } from 'react';
import { Cell, Coord, MAX_NUM } from './cell.util';
import { getRandomElement } from './array.util';

type BoardStatus = 'idle' | 'running' | 'completed' | 'error';

export const useBoard = () => {
  const [boardData, setBoardData] = useState<Cell[][]>(
    Array.from(Array(MAX_NUM), () =>
      Array(MAX_NUM)
        .fill(null)
        .map(() => new Cell())
    )
  );
  const [filledCellCount, setFilledCellCount] = useState(0);
  const [boardStatus, setBoardStatus] = useState<BoardStatus>('idle');

  const initBoard = () => {
    const newBoardData = [...boardData];
    boardData.forEach((row, y) =>
      row.forEach((cell, x) => {
        // y, x 값을 넣어준다.
        cell.coord = { y, x };
        cell.num = 0;
        cell.fillCandidates(true);
      })
    );
    setBoardData(newBoardData);
  };

  useEffect(() => {
    initBoard();
  }, []);

  const startCreateProblem = () => {
    initBoard();
    setBoardStatus('running');
  };

  const stopCreateProblem = () => {
    initBoard();
    setBoardStatus('idle');
  };

  useEffect(() => {
    while (boardStatus === 'running' && filledCellCount < MAX_NUM * MAX_NUM) {
      const status = setRandomNumberInCell();
      if (status === 'completed') {
        break;
      } else if (status === 'error') {
        initBoard();
        setFilledCellCount(0);
        setBoardStatus('running');
      }
    }
  }, [boardStatus, boardData]);

  const setNumberInCell = (coord: Coord, num: number) => {
    // 중복 좌표 제거를 위해
    const changedCoords = new Set<string>([]);
    const changedYCell: Cell[] = [];
    const changedXCell: Cell[] = [];
    const changedBoxCell: Cell[] = [];
    const { y, x } = coord;

    setFilledCellCount(filledCellCount + 1);
    boardData[y][x].num = num;
    // 값이 들어가면서 후보숫자 전체 제거
    boardData[y][x].fillCandidates(false);

    // 세로 cells
    for (let _y = 0; _y < MAX_NUM; _y++) {
      if (y === _y && boardData[_y][x].num) continue;

      const yCoord = { y: _y, x };
      changedCoords.add(JSON.stringify(yCoord));
      changedYCell.push(boardData[_y][x]);
    }

    // 가로 cells
    for (let _x = 0; _x < MAX_NUM; _x++) {
      if (x === _x && boardData[y][_x].num) continue;

      const xCoord = { y, x: _x };
      changedCoords.add(JSON.stringify(xCoord));
      changedXCell.push(boardData[y][_x]);
    }

    // 3 X 3 box cells
    for (let i = 0; i < MAX_NUM; i++) {
      const _y = y - (y % 3) + (i % 3);
      const _x = x - (x % 3) + Math.floor(i / 3);
      if (y === _y && x === _x && boardData[_y][_x].num) continue;

      const boxCoord = { y: _y, x: _x };
      changedCoords.add(JSON.stringify(boxCoord));
      changedBoxCell.push(boardData[_y][_x]);
    }

    const changedCells: Cell[] = [];
    changedCoords.forEach((sCoord) => {
      const { y, x } = JSON.parse(sCoord);
      const cell = boardData[y][x];
      if (!cell.num) {
        changedCells.push(cell);
        cell.removeCandidate(num);
      }
    });

    const hiddenSingleYCell = checkHiddenSingle(changedYCell);
    if (hiddenSingleYCell) setNumberInCell(hiddenSingleYCell[0].coord, hiddenSingleYCell[1]);
    const hiddenSingleXCell = checkHiddenSingle(changedXCell);
    if (hiddenSingleXCell) setNumberInCell(hiddenSingleXCell[0].coord, hiddenSingleXCell[1]);
    const hiddenSingleBoxCell = checkHiddenSingle(changedBoxCell);
    if (hiddenSingleBoxCell) setNumberInCell(hiddenSingleBoxCell[0].coord, hiddenSingleBoxCell[1]);

    const nakedSingleCells = checkNakedSingle(changedCells);
    if (nakedSingleCells.length) {
      nakedSingleCells.forEach((cell) => {
        const hiddenNumber = cell.getRemainCandidatesNumber()[0];
        setNumberInCell(cell.coord, hiddenNumber);
      });
    }
  };

  const setRandomNumberInCell = (): BoardStatus => {
    const newBoardData = [...boardData];
    const emptyCell = findEmptyCell(newBoardData);
    if (emptyCell) {
      const randomNumber = findRandomNumberInCell(emptyCell);
      if (randomNumber) {
        setNumberInCell(emptyCell.coord, randomNumber);

        setBoardData(newBoardData);
      } else {
        console.error('빈 후보수가 없습니다.', filledCellCount);
        return 'error';
      }
    } else {
      console.error('빈 셀이 없습니다.');
      return 'completed';
    }

    return 'running';
  };

  return {
    boardData,
    filledCellCount,
    setRandomNumberInCell,
    setNumberInCell,
    startCreateProblem,
    stopCreateProblem,
  };
};

const findEmptyCell = (board: Cell[][]): Cell | null => {
  const emptyCells = board.flatMap((row) => row.filter((cell) => !cell.num));
  const randomCell = getRandomElement<Cell>(emptyCells);

  return randomCell;
};

const findRandomNumberInCell = (cell: Cell): number => {
  const candidatesNumber = cell.getRemainCandidatesNumber();
  const randomCandidate = getRandomElement<number>(candidatesNumber);

  return randomCandidate || 0;
};

const checkHiddenSingle = (cells: Cell[]): [Cell, number] | null => {
  const candidateMap = new Map<number, number[]>();
  cells.forEach((cell, i) => {
    cell.getRemainCandidatesNumber().forEach((candidate) => {
      if (candidateMap.has(candidate)) {
        candidateMap.get(candidate)!.push(i);
      } else {
        candidateMap.set(candidate, [i]);
      }
    });
  });

  for (const [candidate, cellIndices] of candidateMap.entries()) {
    if (cellIndices.length === 1) {
      const hiddenCellIndex = cellIndices[0];
      return [cells[hiddenCellIndex], candidate];
    }
  }

  return null;
};

const checkNakedSingle = (cells: Cell[]): Cell[] => {
  return cells.filter((cell) => cell.getRemainCandidatesNumber().length === 1);
};
