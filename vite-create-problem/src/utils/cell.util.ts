export const MAX_NUM = 9;

// coordinate
export type Coord = { y: number; x: number };

export class Cell {
  #coord: Coord;
  #num: number;
  #readonly: boolean;
  #candidates: boolean[];

  constructor(coord: Coord = { y: 0, x: 0 }, num: number = 0, readonly: boolean = false) {
    this.#coord = coord;
    this.#num = num;
    this.#readonly = readonly;
    this.#candidates = Array(MAX_NUM).fill(true);
  }

  get coord() {
    return this.#coord;
  }

  set coord(_coord) {
    this.#coord = _coord;
  }

  get num() {
    return this.#num;
  }

  set num(_num) {
    this.#num = _num;
  }

  get readonly() {
    return this.#readonly;
  }

  get candidates() {
    return this.#candidates;
  }

  fillCandidates(value: boolean) {
    this.#candidates = Array(MAX_NUM).fill(value);
  }

  removeCandidate(num: number) {
    // zero base -1
    this.#candidates[num - 1] = false;
  }

  getRemainCandidatesNumber(): number[] {
    const remainCandidatesNumber: number[] = [];
    this.#candidates.forEach((candidate, i) => {
      if (candidate) {
        remainCandidatesNumber.push(i + 1);
      }
    });

    return remainCandidatesNumber;
  }
}
