import { Input } from "@/components/ui/input"

export function InputFile({
	onChange,
}: {
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
	return (
		<div className="grid w-full max-w-sm items-center gap-1.5">
			{/* <Label htmlFor="picture">Picture</Label> */}
			<Input id="picture" type="file" accept="image/*" onChange={onChange} />
		</div>
	)
}
