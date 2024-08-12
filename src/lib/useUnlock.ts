import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type State = {
	unlockMap: Record<string, boolean>
}

type Actions = {
	unlock(name: string): void
	lock(name: string): void
}

export const useUnlock = create<State & Actions>()(
	immer((set) => ({
		unlockMap: {},
		unlock: (name: string) => {
			set((state) => {
				state.unlockMap[name] = true
			})
		},
		lock: (name: string) => {
			set((state) => {
				state.unlockMap[name] = false
			})
		},
	}))
)
