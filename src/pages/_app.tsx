import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import "@/styles/globals.css"
import { Toaster } from "@/components/ui/sonner"

const fontHeading = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-heading",
})

const fontBody = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-body",
})

export default function Layout({ Component, pageProps }: AppProps) {
	return (
		<>
			<Component {...pageProps} />
			<Toaster />
		</>
	)
}
