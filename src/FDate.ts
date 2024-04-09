const timeUnitsFormat = /(Y|M|W|D|h|ms|m|s)\1*/g;
const timeRegex = /(\d*)(Y|M|W|D|h|ms|m|s)/g;

export class FDate extends Date {
  get Y() { return this.getFullYear(); }
  get M() { return this.getMonth() + 1; }
  get W() { return this.getDay(); }
  get D() { return this.getDate(); }
  get h() { return this.getHours(); }
  get m() { return this.getMinutes(); }
  get s() { return this.getSeconds(); }
  get ms() { return this.getMilliseconds(); }

  set Y(value) { this.setFullYear(value); }
  set M(value) { this.setMonth(value - 1); }
  set W(value) { this.setDate(value); }
  set D(value) { this.setDate(value); }
  set h(value) { this.setHours(value); }
  set m(value) { this.setMinutes(value); }
  set s(value) { this.setSeconds(value); }
  set ms(value) { this.setMilliseconds(value); }

  /**
   * Formats the date using the specified format string.
   *
   * @param format - the format string to use for formatting the date
   * @return The formatted date string
   */
  format(format: string = "YY-MM-W-DD hh:mm:ss ms") {
    if (!timeUnitsFormat.test(format)) {
      throw new Error('Invalid format string');
    }

    const fdate = this;

    const res = format.replace(timeUnitsFormat, (find, key) => {
      const value = fdate[key];

      if (typeof value !== 'number') return ''

      return value.toString().padStart(key === 'ms' ? 4 : find.length, '0')
    })

    return res
  }

  /**
   * Create instance of FDate and use method format to format date in string.
   *
   * @param format [YY-MM-W-DD hh:mm:ss ms] - format date to string
	 * @param date - the date to convert
   * @returns The date in string
   */
  static toFormat(format?: string, date?: string | number | FDate) {
		if (date) {
			return new FDate(date).format(format)
		} else {
			return (date: string | number | FDate) => new FDate(date).format(format)
		}
  }

  /**
   * Convert a date string to milliseconds.
   *
   * @param date - the date string to convert
   * @return The date in milliseconds
   */
  static toMilliseconds(date: string) {
    if (!timeRegex.test(date)) {
      throw new Error('Invalid date string');
    }

    const fdate = new FDate();

    for (const [_, value, unit] of date.matchAll(timeRegex)) {
      if (typeof fdate[unit] !== 'number') return

      fdate[unit] += Number(value)
    }

    return Number(fdate)
  }
}
