import { useCallback, useEffect, useState } from "react"

// This hook is used to manage the state of a component that is not only controlled by the parent component.
export function useManagedState<T>(
	state?: T,
	onChangeState?: (state: T) => void
): [T | undefined, (state: T) => void] {
	const [localState, setLocalState] = useState<T | undefined>(state)

	const onOpenChange = useCallback(
		(s: T) => {
			onChangeState?.(s)

			if (state === undefined) {
				// only change local state if the state is not controlled by the parent
				setLocalState(s)
			}
		},
		[onChangeState, state]
	)

	useEffect(() => {
		setLocalState(state)
	}, [state])

	return [localState, onOpenChange]
}
