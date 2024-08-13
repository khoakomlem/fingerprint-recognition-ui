import { useUnlock } from "@/lib/useUnlock"
import { Button } from "./ui/button"
import { toast } from "sonner"

export function Lock({ name }: { name: string }) {
	const lock = useUnlock((state) => state.lock)

	const handleLock = (name: string) => {
		toast("User locked!")
		lock(name)
	}

	return (
		<Button
			type="submit"
			className="flex items-center gap-x-2"
			onClick={() => handleLock(name)}
			size={"sm"}
		>
			Lock
		</Button>
	)
}
