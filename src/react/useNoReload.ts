"use client"

import { useCallback, useEffect, useState } from "react"

/**
 * @description
 * A hook that prevents the page from reloading when the `listen` parameter is set to `true`.
 */
export function useNoReload() {
	const [listen, setListen] = useState(false)

	useEffect(() => {
		if (!listen) return

		const onBeforeReload: WindowEventHandlers["onbeforeunload"] = (ev) => {
			ev.preventDefault()
			ev.returnValue = "You have unsaved changes. Are you sure you want to leave?"
		}

		window.addEventListener("beforeunload", onBeforeReload)
		return () => window.removeEventListener("beforeunload", onBeforeReload)
	}, [listen])

	const setListenState = useCallback((listen: boolean) => {
		setListen(listen)
	}, [])

	return setListenState
}