import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type State = {
	users: string[]
}

type Actions = {
	setUsers(users: string[]): void
	add(name: string): void
	remove(name: string): void
}

export const useUsers = create<State & Actions>()(
	immer((set) => ({
		users: [],
		add: (name: string) =>
			set((state) => {
				state.users.push(name)
			}),
		remove: (name: string) =>
			set((state) => {
				state.users = state.users.filter((u) => u !== name)
			}),
		setUsers: (users: string[]) =>
			set((state) => {
				state.users = users
			}),
	}))
)
