import { MODELS } from "@/components/SelectModel"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type State = {
	unlockMap: Record<string, boolean>
	modelname: string
}

type Actions = {
	unlock(name: string): void
	lock(name: string): void
	selectModel(name: string): void
}

export const useUnlock = create<State & Actions>()(
	immer((set) => ({
		unlockMap: {},
		modelname: MODELS[0],
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
	}))
)
