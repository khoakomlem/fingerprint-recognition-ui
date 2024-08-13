const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

const isError = (res: Response) => {
	if (!res.ok) {
		throw new Error(res.statusText)
	}
}

export const api = {
	list: async () => {
		const res = await fetch(`${API_URL}/`)
		const json = await res.json()
		isError(res)
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
		isError(res)
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
		isError(res)
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
		isError(res)
		const json = await res.json()
		return json.data as string
	},
}
