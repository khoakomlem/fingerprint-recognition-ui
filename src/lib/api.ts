const API_URL = "http://localhost:8000"

export const api = {
	list: async () => {
		const res = await fetch(`${API_URL}/`)
		const json = await res.json()
		return json.data as {
			id: number
			name: string
			label: string
		}[]
	},

	find: async (imgBase64: string) => {
		const res = await fetch(`${API_URL}/find`, {
			method: "POST",
			body: JSON.stringify({
				fingerprint: imgBase64.replace(/^data:image\/\w+;base64,/, ""),
			}),
		})
		const json = await res.json()
		return json.data as {
			id: number
			name: string
			score: number
			label: string
		}
	},

	register: async (name: string, imgBase64: string) => {
		const res = await fetch(`${API_URL}/register`, {
			method: "POST",
			body: JSON.stringify({
				name,
				gender: 1,
				lr: 1,
				finger: 1,
				fingerprint: imgBase64.replace(/^data:image\/\w+;base64,/, ""),
			}),
		})
		const json = await res.json()
		return json.data as string
	},

	delete: async (name: string) => {
		const res = await fetch(`${API_URL}/delete`, {
			method: "POST",
			body: JSON.stringify({
				name,
			}),
		})
		const json = await res.json()
		return json.data as string
	},
}
