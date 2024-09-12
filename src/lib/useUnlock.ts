import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type State = {
	unlockMap: Record<string, boolean>
	modelname: string
	filtername: string
}

type Actions = {
	unlock(name: string): void
	lock(name: string): void
	selectModel(name: string): void
	selectFilter(name: string): void
}

export const useUnlock = create<State & Actions>()(
	immer((set) => ({
		unlockMap: {},
		modelname: "",
		filtername: "",
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
		selectModel(name: string) {
			set((state) => {
				state.modelname = name
			})
		},
		selectFilter(name: string) {
			set((state) => {
				state.filtername = name
			})
		},
	}))
)
