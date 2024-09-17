import { useSearchParams as nextUseSearchParams, usePathname, useRouter } from "next/navigation"
import { useCallback } from "react"

export function useSearchParams<SearchParams extends string = string>() {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = nextUseSearchParams()

	const createQueryString = useCallback(
		(name: SearchParams, value: string) => {
			const params = new URLSearchParams(searchParams.toString())
			params.set(name, value)

			return params.toString()
		},
		[searchParams],
	)

	const getParam = useCallback((key: SearchParams) => searchParams.get(key), [searchParams])

	const setParam = useCallback(
		(key: SearchParams, value: string) => {
			router.push(`/?${createQueryString(key, value)}`, { scroll: false })
		},
		[router, createQueryString],
	)

	const hasParam = useCallback((key: SearchParams) => searchParams.has(key), [searchParams])

	const deleteParam = useCallback(
		(key: SearchParams, force = false) => {
			router.push(force ? pathname : `${pathname}?${createQueryString(key, "")}`, { scroll: false })
		},
		[pathname, createQueryString, router],
	)

	const clearParams = useCallback(() => router.push(pathname), [pathname, router])

	return {
		getSearchParam: getParam,
		setSearchParam: setParam,
		hasSearchParam: hasParam,
		deleteSearchParam: deleteParam,
		clearSearchParams: clearParams,
		searchParams,
	}
}
