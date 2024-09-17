type Fetch = typeof fetch
type FetchArgs = Parameters<Fetch>
type FetchResult = ReturnType<Fetch>
type FetchFunc = (url: FetchArgs[0], init?: FetchArgs[1]) => Promise<Awaited<FetchResult> | undefined>

export const safeFetch: FetchFunc = async (url, init) => {
	try {
		return await fetch(url, {
			...init,
			credentials: "include",
		})
	} catch (e) {
		console.error("[safeFetch - catch]", url)
	}
}
