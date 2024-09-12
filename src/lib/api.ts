import type { House } from "./useHouses"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

const isError = (res: Response) => {
	if (!res.ok) {
		throw new Error(res.statusText)
	}
}

type ModelOptions = {
	modelname: string
	filtername: string
}

export const api = {
	list: async () => {
		const res = await fetch(`${API_URL}/`)
		const json = await res.json()
		isError(res)
		return json.data as House[]
	},

	find: async (imgBase64: string, opts: ModelOptions) => {
		if (!opts.modelname) {
			throw new Error("Model name is required")
		}
		const res = await fetch(`${API_URL}/find`, {
			method: "POST",
			body: JSON.stringify({
				fingerprint: imgBase64.replace(/^data:image\/\w+;base64,/, ""),
				model: opts.modelname,
				filter: opts.filtername,
			}),
		})
		isError(res)
		const json = await res.json()
		return json.data as {
			id: string
			score: number
			name: string
			fingerprint_id: string
		}
	},

	register: async (name: string, imgsBase64: string[], opts: ModelOptions) => {
		const res = await fetch(`${API_URL}/register`, {
			method: "POST",
			body: JSON.stringify({
				name,
				fingerprints: imgsBase64.map((i) =>
					i.replace(/^data:image\/\w+;base64,/, "")
				),
				model: opts.modelname,
				filter: opts.filtername,
			}),
		})
		isError(res)
		const json = await res.json()
		return json.data as House
	},

	delete: async (id: string) => {
		const res = await fetch(`${API_URL}/delete`, {
			method: "POST",
			body: JSON.stringify({
				id,
			}),
		})
		isError(res)
		const json = await res.json()
		return json.data as string
	},

	get_fingerprint: async (fingerprint_id: string) => {
		const res = await fetch(
			`${API_URL}/fingerprint?fingerprint_id=${fingerprint_id}`
		)
		isError(res)
		const json = await res.json()
		return json.data as string
	},

	update: async (id: string, name: string, imgsBase64: string[]) => {
		const res = await fetch(`${API_URL}/update`, {
			method: "POST",
			body: JSON.stringify({
				id,
				name,
				fingerprints: imgsBase64.map((i) =>
					i.replace(/^data:image\/\w+;base64,/, "")
				),
			}),
		})
		isError(res)
		const json = await res.json()
		return json.data as House
	},

	get_models: async () => {
		const res = await fetch(`${API_URL}/models`)
		const json = await res.json()
		isError(res)
		return json.data as string[]
	},
}
