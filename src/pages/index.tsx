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
import { AddUser } from "@/components/AddUser"
import { ConfirmAlertWrapper } from "@/components/ConfirmAlert"
import { Unlock } from "@/components/Unlock"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { useUnlock } from "@/lib/useUnlock"
import { Lock } from "@/components/Lock"
import { useUsers } from "@/lib/useUsers"
import { toast } from "sonner"

function Component() {
	const users = useUsers((state) => state.users)
	const setUsers = useUsers((state) => state.setUsers)

	useEffect(() => {
		api.list().then((users) => {
			setUsers(users.map((u) => u.name))
		})
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
						<h1 className="text-2xl font-bold">Users</h1>
						<AddUser></AddUser>
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
									{users.map((user, i) => (
										<UserRow key={i} name={user}></UserRow>
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

function UserRow({ name }: { name: string }) {
	const isLocked = useUnlock((state) => !state.unlockMap[name])
	const remove = useUsers((state) => state.remove)

	const handleDelete = async (name: string) => {
		try {
			await api.delete(name)
			remove(name)
			toast("✅ User has been deleted", {
				description: "User has been deleted successfully",
			})
		} catch (error) {
			toast("❌ Failed to delete user", {
				description: "Failed to delete user",
			})
		}
	}

	return (
		<TableRow>
			<TableCell className="font-medium">{name}</TableCell>
			<TableCell>
				<Badge variant={isLocked ? "destructive" : "secondary"}>
					{isLocked ? "Locked" : "Unlocked"}
				</Badge>
			</TableCell>
			<TableCell className="flex items-center">
				{isLocked ? <Unlock name={name}></Unlock> : <Lock name={name}></Lock>}
				<ConfirmAlertWrapper
					onConfirm={() => {
						handleDelete(name)
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
