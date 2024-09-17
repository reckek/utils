import {
	createContext as createReactContext,
	useContext as useReactContext,
	useMemo,
	type FC,
	type PropsWithChildren,
} from "react"

export function createContext<ContextValue extends Record<string, unknown> | null>(
	contextName: string,
	defaultContext?: ContextValue,
) {
	const Ctx = createReactContext<ContextValue | undefined>(defaultContext)
	Ctx.displayName = contextName

	const Provider: FC<PropsWithChildren<ContextValue>> = ({ children, ...context }) => {
		// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
		const value = useMemo(() => context, [Object.values(context)]) as ContextValue
		return <Ctx.Provider value={value}>{children}</Ctx.Provider>
	}
	Provider.displayName = `${contextName}.Provider`

	function useContext(consumerName: string) {
		const ctx = useReactContext(Ctx)
		if (ctx) return ctx
		if (defaultContext !== undefined) return defaultContext
		throw new Error(`use${consumerName} must be used within a ${contextName}.Provider`)
	}

	return [Provider, useContext] as const
}
