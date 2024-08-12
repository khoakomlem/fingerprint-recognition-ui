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
import { useUsers } from "@/lib/useUsers"

export function AddUser() {
	const [img, setImg] = useState<string>()
	const [name, setName] = useState<string>(
		"Khoa Bean " + Math.floor(Math.random() * 10000)
	)
	const [isLoading, setIsLoading] = useState(false)
	const add = useUsers((state) => state.add)
	const [open, setOpen] = useState(false)

	const handleAdd = async () => {
		try {
			if (img && name) {
				setIsLoading(true)
				await api.register(name, img)
				add(name)
				setIsLoading(false)
				toast("✅ User has been added", {
					description: "User has been added successfully",
				})
			}
		} catch (error) {
			setIsLoading(false)
			toast("❌ Failed to add user", {
				description: "Failed to add user",
			})
		} finally {
			setOpen(false)
		}
	}

	const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsLoading(true)
		const file = e.target.files?.[0]
		if (file) {
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

	return (
		<Dialog
			open={open}
			onOpenChange={(o) => {
				setOpen(o)
			}}
		>
			<DialogTrigger asChild>
				<Button variant="outline">Add user</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add user</DialogTitle>
					<DialogDescription>
						Add a new user with their name and fingerprint
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
					<div className="flex flex-row">
						<Label
							htmlFor="username"
							className="flex items-center min-w-[100px] max-w-[100px]"
						>
							Fingerprint
						</Label>
						<InputFile onChange={handleChangeImg} />
					</div>
				</div>
				<DialogFooter>
					<Button
						type="submit"
						onClick={handleAdd}
						disabled={!img || !name || isLoading}
						className="flex items-center gap-x-2"
					>
						Add
						{isLoading && <LoadingSpin></LoadingSpin>}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
