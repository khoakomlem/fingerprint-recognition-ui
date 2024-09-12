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
import { api } from "@/lib/api"
import { useUnlock } from "@/lib/useUnlock"
import { useEffect, useState } from "react"

export function SelectModel() {
	const [models, setModels] = useState<string[]>([])
	const modelname = useUnlock((state) => state.modelname)
	const selectModel = useUnlock((state) => state.selectModel)

	useEffect(() => {
		api.get_models().then((models) => {
			setModels(models)
			selectModel(models[0])
		})
	}, [])

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">Model: {modelname}</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>Select model</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup value={modelname} onValueChange={selectModel}>
					{models.map((model) => (
						<DropdownMenuRadioItem key={model} value={model}>
							{model}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
