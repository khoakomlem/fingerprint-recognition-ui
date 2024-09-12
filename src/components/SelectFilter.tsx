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

const FILTERS = ["none", "gabor"]

export function SelectFilter() {
	const filtername = useUnlock((state) => state.filtername)
	const selectFilter = useUnlock((state) => state.selectFilter)

	useEffect(() => {
		selectFilter("gabor")
	}, [])

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">Filter: {filtername}</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>Select model</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup value={filtername} onValueChange={selectFilter}>
					{FILTERS.map((name) => (
						<DropdownMenuRadioItem key={name} value={name}>
							{name}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
