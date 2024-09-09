import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

export type House = {
	id: string
	name: string
	fingerprints: string[]
}

type State = {
	houses: House[]
}

type Actions = {
	setHouses(houses: House[]): void
	add(house: House): void
	remove(house: House): void
}

export const useHouses = create<State & Actions>()(
	immer((set) => ({
		houses: [],
		add: (house: House) =>
			set((state) => {
				state.houses.push(house)
			}),
		remove: (house: House) =>
			set((state) => {
				state.houses = state.houses.filter((u) => u.id !== house.id)
			}),
		setHouses: (houses: House[]) =>
			set((state) => {
				state.houses = houses
			}),
	}))
)
