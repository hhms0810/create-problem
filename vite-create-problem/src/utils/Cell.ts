export const MAX_NUM = 9;

export class Cell {
  #num: number;
  #readonly: boolean;
  #memos: boolean[];

  constructor(num: number = 0, readonly: boolean = false) {
    this.#num = num;
    this.#readonly = readonly;
    this.#memos = Array(MAX_NUM).fill(false);
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

  get memos() {
    return this.#memos;
  }
}
