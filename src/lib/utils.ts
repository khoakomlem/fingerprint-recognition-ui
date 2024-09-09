import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function blobToBase64(blobUrl: string): Promise<string> {
	return new Promise((resolve, _) => {
		const reader = new FileReader()
		reader.onloadend = () => resolve(reader.result as string)
		fetch(blobUrl).then((r) =>
			r.blob().then((blob) => reader.readAsDataURL(blob))
		)
	})
}
