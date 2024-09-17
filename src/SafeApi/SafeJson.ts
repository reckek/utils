// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class SafeJson {
	static parse(data: string): Record<string, unknown> | undefined {
		try {
			return JSON.parse(data)
		} catch (e) {}
	}

	static stringify(data: unknown, replace?: never, space?: number): string | undefined {
		try {
			return JSON.stringify(data, replace, space)
		} catch (e) {}
	}

	static isStringify(data: unknown): boolean {
		return !!SafeJson.stringify(data)
	}

	static isParsable(data: string): boolean {
		return !!SafeJson.parse(data)
	}
}
