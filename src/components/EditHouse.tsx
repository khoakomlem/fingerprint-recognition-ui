import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InputFile } from "./InputFile"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { LoadingSpin } from "./icons/LoadingSpin"
import { House, useHouses } from "@/lib/useHouses"
import { FingerprintDropzone } from "./FingerprintDropzone"
import { blobToBase64 } from "@/lib/utils"

function base64ToBlobUrl(base64: string, mimeType: string) {
	// Decode the base64 string
	const byteCharacters = atob(base64)

	// Create an array to store the binary data
	const byteNumbers = new Array(byteCharacters.length)
	for (let i = 0; i < byteCharacters.length; i++) {
		byteNumbers[i] = byteCharacters.charCodeAt(i)
	}

	// Convert the binary data into a Blob
	const byteArray = new Uint8Array(byteNumbers)
	const blob = new Blob([byteArray], { type: mimeType })

	// Generate a Blob URL
	const blobUrl = URL.createObjectURL(blob)

	return blobUrl
}

export function EditHouse({ house }: { house: House }) {
	const [name, setName] = useState(house.name)
	const [imgs, setImgs] = useState<string[]>([])
	const [isLoading, setIsLoading] = useState(false)
	// const add = useHouses((state) => state.add)
	const [open, setOpen] = useState(false)

	useEffect(() => {
		house.fingerprint_ids.forEach(async (fingerprint) => {
			const base64img = await api.get_fingerprint(fingerprint)
			setImgs((imgs) => [...imgs, base64ToBlobUrl(base64img, "image/bmp")])
		})
	}, [])

	const handleAdd = async () => {
		try {
			if (imgs) {
				setIsLoading(true)
				const base64Imgs = await Promise.all(
					imgs.map(async (img) => blobToBase64(img))
				)
				await api.update(house.id, name, base64Imgs)

				setIsLoading(false)
				toast("✅ House has been edited", {
					description: "House has been edited successfully",
				})
			}
		} catch (error) {
			setIsLoading(false)
			toast("❌ Failed to edit house", {
				// @ts-ignore
				description: error.message,
			})
		} finally {
			setOpen(false)
		}
	}

	return (
		<Dialog
			open={open}
			onOpenChange={(o) => {
				setOpen(o)
			}}
		>
			<DialogTrigger asChild>
				<Button variant="secondary" size="sm">
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent
				className="sm:max-w-[525px]"
				onEscapeKeyDown={(e) => {
					if (isLoading) e.preventDefault()
				}}
				onPointerDownOutside={(e) => {
					if (isLoading) e.preventDefault()
				}}
				onInteractOutside={(e) => {
					if (isLoading) e.preventDefault()
				}}
			>
				<DialogHeader>
					<DialogTitle>Edit</DialogTitle>
					<DialogDescription>
						Add or remove fingerprint images
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-4 py-4">
					<div className="flex flex-row">
						<Label
							htmlFor="name"
							className="flex items-center min-w-[100px] max-w-[100px]"
						>
							Name
						</Label>
						<Input
							// onInput={(e) => {
							// 	setName(e.currentTarget.value)
							// }}
							id="name"
							// defaultValue={name}
							value={house.name}
							disabled
						/>
					</div>
					<FingerprintDropzone
						imgs={imgs}
						setImgs={setImgs}
						house={house}
					></FingerprintDropzone>
				</div>
				<DialogFooter>
					<Button
						type="submit"
						onClick={handleAdd}
						disabled={!imgs.length || isLoading}
						className="flex items-center gap-x-2"
					>
						Confirm edit
						{isLoading && <LoadingSpin></LoadingSpin>}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
