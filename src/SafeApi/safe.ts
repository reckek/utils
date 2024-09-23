export type Safe<T> = {
	success: boolean
	data?: T
	error?: string
} & (
	| {
			success: true
			data: T
	  }
	| {
			success: false
			error: string
	  }
)

export function safe<T>(promise: Promise<T>, err?: string): Promise<Safe<T>>
export function safe<T>(func: () => T, err?: string): Safe<T>
export function safe<T>(promiseOrFunc: Promise<T> | (() => T), err?: string): Promise<Safe<T>> | Safe<T> {
	if (promiseOrFunc instanceof Promise) {
		return safeAsync(promiseOrFunc, err)
	}

	return safeSync(promiseOrFunc, err)
}

async function safeAsync<T>(promise: Promise<T>, err?: string): Promise<Safe<T>> {
	try {
		const data = await promise
		return { data, success: true }
	} catch (e) {
		return formatErrorResponse(e, err)
	}
}

function safeSync<T>(func: () => T, err?: string): Safe<T> {
	try {
		const data = func()
		return { data, success: true }
	} catch (e) {
		return formatErrorResponse(e, err)
	}
}

function formatErrorResponse(error: unknown, errorName?: string): Safe<never> {
	if (errorName !== undefined) {
		return { success: false, error: errorName }
	}

	if (error instanceof Error) {
		return { success: false, error: error.message }
	}

	return { success: false, error: "error" }
}
