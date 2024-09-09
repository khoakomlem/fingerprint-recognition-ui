import { useUnlock } from "@/lib/useUnlock"
import { Button } from "./ui/button"
import { toast } from "sonner"

export function Lock({ id }: { id: string }) {
	const lock = useUnlock((state) => state.lock)

	const handleLock = (id: string) => {
		toast("House locked!")
		lock(id)
	}

	return (
		<Button
			type="submit"
			className="flex items-center gap-x-2"
			onClick={() => handleLock(id)}
			size={"sm"}
		>
			Lock
		</Button>
	)
}
