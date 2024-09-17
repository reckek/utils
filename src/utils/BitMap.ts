// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class BitManager {
  /**
   * @description
   * This method for get bits from integer.
   *
   * @example
   * BitOperation.getBits(0b1010) => "1010"
   * BitOperation.getBits(122) => "11001010"
   * BitOperation.getBits(0x123) => "100100011"
   */
  static getBits(num: number) {
    return num.toString(2);
  }

  /**
   * @description
   * This method for get bit preview.
   *
   * @example
   * BitOperation.getBitByIndex(0b1010, 3) => "0" "1(0)10"
   * BitOperation.getBitByIndex(122, 4) => "1" "1100(1)010"
   * BitOperation.getBitByIndex(0x123, 6) => "1" "100(1)00011"
   */
  static getBitByIndex(num: number, index: number) {
    return this.getBits(num).at(-index - 1);
  }

  /**
   * @description
   * This method for get number.
   *
   * @example
   * BitOperation.getBit(0b1010 | 10, 3) => 8
   * BitOperation.getBit(122, 6) => 64
   * BitOperation.getBit(0x123 | 291, 8) => 291
   */
  static getBit(num: number, index: number) {
    return num & (1 << index);
  }

  /**
   * @description
   * This method for get bit value (true/false).
   *
   * @example
   * BitOperation.hasBit(0b1010 | 10, 3) => 8
   * BitOperation.hasBit(122, 6) => 64
   * BitOperation.hasBit(0x123 | 291, 8) => 291
   */
  static hasBit(num: number, index: number): boolean {
    return this.getBit(num, index) !== 0;
  }

  /**
   * @description
   * This method for set bit.
   *
   * @example
   * BitOperation.setBit(0b1010 | 10, 3) => 10
   * BitOperation.setBit(122, 6) => 122
   * BitOperation.setBit(0x123 | 291, 8, false) => 35
   */
  static setBit(num: number, index: number): number {
    return num | (1 << index);
  }

  /**
   * @description
   * This method for inverse bit.
   *
   * @example
   * BitOperation.inverseBit(0b1010 | 10, 3) => 2
   * BitOperation.inverseBit(122, 6) => 58
   * BitOperation.inverseBit(0x123 | 291, 8) => 35
   */
  static inverseBit(num: number, index: number): number {
    return num ^ (1 << index);
  }

  /**
   * @description
   * This method for clear bit.
   *
   * @example
   * BitOperation.clearBit(0b1010 | 10, 3) => 2
   * BitOperation.clearBit(122, 6) => 58
   * BitOperation.clearBit(0x123 | 291, 8) => 35
   */
  static clearBit(num: number, index: number): number {
    return num & ~(1 << index);
  }
}

export class Flag {
  public flag: number;

  constructor(initialFlag: number = 0) {
    this.flag = initialFlag;
  }

  get bitsPreview() {
    return BitManager.getBits(this.flag);
  }

  /**
   * Get the bit at the specified index.
   *
   * @param index - the index of the bit to retrieve
   * @return true if the bit is set, false otherwise
   */
  getBit(index: number) {
    return BitManager.hasBit(this.flag, index);
  }

  /**
   * A function to check if the bit at the given index in the externalFlag matches the bit at the same index in the flag.
   *
   * @param externalFlag - the external flag to compare
   * @param index - the index of the bit to compare
   * @return true if the bits match, false otherwise
   */
  is(externalFlag: number | Flag, index: number) {
    const _externalFlag = externalFlag instanceof Flag ? externalFlag.flag : externalFlag

    if (!BitManager.getBitByIndex(this.flag, index)) {
      throw new Error(`The bit at index ${index} is not set in the flag.`);
    }

    return BitManager.getBit(_externalFlag, index) === BitManager.getBit(this.flag, index);
  }

  /**
   * Set a value at the specified index in the flag using BitOperation methods.
   *
   * @param index - the index at which to set the value
   * @param value - the value to set at the specified index
   * @return 
   */
  set(index: number, value: boolean) {
    if (value) {
      this.flag = BitManager.setBit(this.flag, index);
    } else {
      this.flag = BitManager.clearBit(this.flag, index);
    }
  }

  inverse(index: number) {
    this.flag = BitManager.inverseBit(this.flag, index);
  }

  /**
   * Check if the specified bit at the given index is the same in two flag values.
   *
   * @param flag1 - The first flag value.
   * @param flag2 - The second flag value.
   * @param index - The index of the bit to check.
   * @return True if the specified bit at the given index is the same in two flag values, otherwise false.
   */
  static is(flag1: number | Flag, flag2: number | Flag, index: number) {
    const oldFlag = flag1 instanceof Flag ? flag1.flag : flag1;
    const newFlag = flag2 instanceof Flag ? flag2.flag : flag2;

    if (!BitManager.getBitByIndex(oldFlag, index) && !BitManager.getBitByIndex(newFlag, index)) {
      throw new Error(`The (${index}) index is out of range`);
    }

    return BitManager.hasBit(oldFlag, index) === BitManager.hasBit(newFlag, index);
  }

  /**
   * Combines multiple flags into a single flag value.
   *
   * @param flags - The flags to be combined.
   * @return A new Flag instance representing the combined flag value.
   */
  static combineFlags(...flags: Array<Flag | number>) {
    const flag = flags.reduce((flag, currFlag: number) => 
      flag instanceof Flag ? flag.flag : flag | currFlag, 0) as number;

    return new Flag(flag);
  }
}
