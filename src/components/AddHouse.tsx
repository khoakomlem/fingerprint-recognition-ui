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
import { useState } from "react"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { LoadingSpin } from "./icons/LoadingSpin"
import { useHouses } from "@/lib/useHouses"
import { FingerprintDropzone } from "./FingerprintDropzone"

export function AddHouse() {
	const [imgs, setImgs] = useState<string[]>([])
	const [name, setName] = useState<string>(
		"Happy house " + Math.floor(Math.random() * 100000)
	)
	const [isLoading, setIsLoading] = useState(false)
	const add = useHouses((state) => state.add)
	const [open, setOpen] = useState(false)

	const handleAdd = async () => {
		try {
			if (imgs && name) {
				setIsLoading(true)
				const house = await api.register(name, imgs)
				add(house)
				setIsLoading(false)
				toast("✅ House has been added", {
					description: "House has been added successfully",
				})
			}
		} catch (error) {
			setIsLoading(false)
			toast("❌ Failed to add house", {
				description: "Failed to add house",
			})
		} finally {
			setOpen(false)
		}
	}

	return (
		<Dialog
			open={open}
			onOpenChange={(o) => {
				if (o) {
					setName("Happy house " + Math.floor(Math.random() * 100000))
					setImgs([])
				}
				setOpen(o)
			}}
		>
			<DialogTrigger asChild>
				<Button variant="outline">Add house</Button>
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
					<DialogTitle>Add house</DialogTitle>
					<DialogDescription>
						Add a new house with their name and fingerprint
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
							onInput={(e) => {
								setName(e.currentTarget.value)
							}}
							id="name"
							defaultValue={name}
						/>
					</div>
					<FingerprintDropzone
						imgs={imgs}
						setImgs={setImgs}
					></FingerprintDropzone>
				</div>
				<DialogFooter>
					<Button
						type="submit"
						onClick={handleAdd}
						disabled={!imgs.length || !name || isLoading}
						className="flex items-center gap-x-2"
					>
						Confirm
						{isLoading && <LoadingSpin></LoadingSpin>}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
