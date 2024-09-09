import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import dynamic from "next/dynamic"
import { ConfirmAlertWrapper } from "@/components/ConfirmAlert"
import { Unlock } from "@/components/Unlock"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { useUnlock } from "@/lib/useUnlock"
import { Lock } from "@/components/Lock"
import { toast } from "sonner"
import { type House, useHouses } from "@/lib/useHouses"
import { AddHouse } from "@/components/AddHouse"

function Component() {
	const houses = useHouses<House[]>((state) => state.houses)
	const setHouses = useHouses((state) => state.setHouses)

	useEffect(() => {
		api.list().then(setHouses)
	}, [])

	return (
		<div className="flex flex-col min-h-screen">
			<header className="bg-primary text-primary-foreground py-4 px-6 shadow">
				<div className="container mx-auto flex items-center justify-between">
					<Link href="#" className="text-xl font-bold" prefetch={false}>
						Fingerprint recognition
					</Link>
				</div>
			</header>
			<main className="flex-1 py-8 px-6">
				<div className="container mx-auto">
					<div className="mb-6 flex justify-between">
						<h1 className="text-2xl font-bold">House</h1>
						<AddHouse></AddHouse>
					</div>
					<Card>
						<CardContent className="p-4">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>
											<span className="sr-only">Actions</span>
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{houses.map((house, i) => (
										<HouseRow key={i} house={house}></HouseRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	)
}

function HouseRow({ house }: { house: House }) {
	const isLocked = useUnlock((state) => !state.unlockMap[house.id])
	const remove = useHouses((state) => state.remove)

	const handleDelete = async (id: string) => {
		try {
			await api.delete(id)
			remove(house)
			toast("✅ House has been removed", {
				description: "House has been removed successfully",
			})
		} catch (error) {
			toast("❌ Failed to remove house", {
				description: "Failed to remove house",
			})
		}
	}

	return (
		<TableRow>
			<TableCell className="font-medium">{house.name}</TableCell>
			<TableCell>
				<Badge variant={isLocked ? "destructive" : "secondary"}>
					{isLocked ? "Locked" : "Unlocked"}
				</Badge>
			</TableCell>
			<TableCell className="flex items-center">
				{isLocked ? (
					<Unlock id={house.id}></Unlock>
				) : (
					<Lock id={house.id}></Lock>
				)}
				<ConfirmAlertWrapper
					onConfirm={() => {
						handleDelete(house.id)
					}}
				>
					<Button variant="destructive" size="sm" className="ml-2">
						Delete
					</Button>
				</ConfirmAlertWrapper>
			</TableCell>
		</TableRow>
	)
}

const ClientComponent = dynamic(() => Promise.resolve(Component), {
	ssr: false,
})

export default Component
