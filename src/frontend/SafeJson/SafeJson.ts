export interface StringifyOptions {
  replacer: (key: string, value: unknown) => unknown
  space: string | number
}

export class SafeJson {
  public static parse<T>(json: string): T | null {
    try {
      return JSON.parse(json) as T
    } catch (error) {
      console.error(error)
      return null
    }
  }

  public static stringify(
    data: unknown,
    options?: Partial<StringifyOptions>
  ): string | undefined {
    if (typeof data === 'string') {
      return data
    }

    if (Array.isArray(data) || typeof data === 'object') {
      return JSON.stringify(data, options?.replacer, options?.space)
    } else {
      return String(data)
    }
  }

  public static isJson(json: string): boolean {
    return !!this.parse(json)
  }
}
