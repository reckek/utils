import { useEffect, useState } from "react"

export function useScrollTrigger(hight: number) {
	const [isScrollable, setScrollable] = useState(false)

	useEffect(() => {
		let lastY = window.screenTop

		const setScrollableStatus = () => {
			const isOverflowHidden = !!document.body.style.top.length

			if (isOverflowHidden ? lastY > hight : window.scrollY > hight) {
				setScrollable(true)
			} else {
				setScrollable(false)
			}

			lastY = window.screenTop
		}

		setScrollableStatus()
		window.addEventListener("scroll", setScrollableStatus)
		return () => window.removeEventListener("scroll", setScrollableStatus)
	}, [hight])

	return isScrollable
}
