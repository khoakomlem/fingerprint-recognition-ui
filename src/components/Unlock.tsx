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
import { LoadingSpin } from "./icons/LoadingSpin"
import { toast } from "sonner"
import { api } from "@/lib/api"
import { useUnlock } from "@/lib/useUnlock"

const MIN_SCORE = 0.9875

export function Unlock({ id }: { id: string }) {
	const [img, setImg] = useState<string>()
	const [isLoading, setIsLoading] = useState(false)
	const [open, setOpen] = useState(false)
	const unlock = useUnlock((state) => state.unlock)

	const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setIsLoading(true)
			const reader = new FileReader()
			reader.onload = async () => {
				const base64 = reader.result?.toString()
				if (base64) {
					setImg(base64)
					setIsLoading(false)
				}
			}
			reader.readAsDataURL(file)
		}
	}

	const handleUnlock = async (id: string) => {
		try {
			if (img) {
				setIsLoading(true)
				const result = await api.find(img)
				setIsLoading(false)
				console.log("result", result)
				if (result.score > MIN_SCORE && result.id === id) {
					unlock(id)
					toast("✅ House has been unlocked", {
						description: "House has been unlocked successfully",
					})
				} else {
					toast("❌ Failed to unlock house", {
						description: "Wrong fingerprint",
					})
				}
				setOpen(false)
			}
		} catch (error) {
			setIsLoading(false)
			toast("❌ Failed to unlock house", {
				description: "Wrong fingerprint",
			})
		}
	}

	return (
		<Dialog
			onOpenChange={(o) => {
				setOpen(o)
			}}
			open={open}
		>
			<DialogTrigger asChild>
				<Button variant="outline">Unlock</Button>
			</DialogTrigger>
			<DialogContent
				className="sm:max-w-[425px]"
				onInteractOutside={(e) => {
					e.preventDefault()
				}}
			>
				<DialogHeader>
					<DialogTitle>Unlock fingerprint</DialogTitle>
					<DialogDescription>
						Please unlock your fingerprint to continue
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="flex items-center gap-4">
						<Label htmlFor="username" className="text-right">
							Fingerprint
						</Label>
						<InputFile onChange={handleChangeImg} />
					</div>
				</div>
				<DialogFooter>
					<Button
						type="submit"
						disabled={!img || isLoading}
						className="flex items-center gap-x-2"
						onClick={() => handleUnlock(id)}
					>
						Unlock
						{isLoading && <LoadingSpin></LoadingSpin>}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
