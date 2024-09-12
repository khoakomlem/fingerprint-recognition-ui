import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUnlock } from "@/lib/useUnlock"

export const MODELS = ["gabor15epochs", "nongabor15epochs"]

export function SelectModel() {
	const modelname = useUnlock((state) => state.modelname)
	const selectModel = useUnlock((state) => state.selectModel)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">Model: {modelname}</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>Select model</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup value={modelname} onValueChange={selectModel}>
					{MODELS.map((model) => (
						<DropdownMenuRadioItem key={model} value={model}>
							{model}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
