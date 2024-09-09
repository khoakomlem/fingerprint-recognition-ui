"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { blobToBase64 } from "@/lib/utils"

export function FingerprintDropzone({
	imgs: images,
	setImgs: setImages,
}: {
	imgs: string[]
	setImgs: React.Dispatch<React.SetStateAction<string[]>>
}) {
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files
		if (files) {
			const newImages = Array.from(files).map((file) =>
				URL.createObjectURL(file)
			)
			const base64s = await Promise.all(
				newImages.map((imgUrl) => blobToBase64(imgUrl))
			)
			setImages((prevImages) => [...prevImages, ...base64s])
			console.log("base64s", base64s)
		}
	}

	const handleButtonClick = () => {
		fileInputRef.current?.click()
	}

	const removeImage = (index: number) => {
		setImages((prevImages) => prevImages.filter((_, i) => i !== index))
	}

	return (
		<div className="w-full max-w-3xl mx-auto p-4">
			<div className="mb-4 flex flex-col items-center">
				<Input
					type="file"
					accept="image/*"
					multiple
					onChange={handleFileChange}
					className="hidden"
					ref={fileInputRef}
					id="image-upload"
				/>
				<Button onClick={handleButtonClick} className="mb-2">
					Add fingerprints
				</Button>
				<label htmlFor="image-upload" className="text-sm text-gray-500">
					{/* Select multiple image files to display in the carousel */}
				</label>
			</div>

			{images.length > 0 && (
				<Carousel
					className="w-full max-w-[400px] mx-auto"
					opts={{
						dragFree: true,
					}}
				>
					<CarouselContent>
						{images.map((image, index) => (
							<CarouselItem
								key={index}
								className="basis-1/4 cursor-pointer select-none"
							>
								<Card className="relative">
									<Button
										variant="destructive"
										size="icon"
										className="absolute top-1 right-1 z-10 p-0 w-4 h-4"
										onClick={() => removeImage(index)}
										aria-label={`Remove image ${index + 1}`}
									>
										<X className="h-4 w-4" />
									</Button>
									<CardContent className="flex aspect-square items-center justify-center p-1">
										<Image
											src={image}
											alt={`Uploaded image ${index + 1}`}
											width={100}
											height={100}
											className="max-w-full max-h-full object-contain rounded-md"
										/>
									</CardContent>
								</Card>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			)}
		</div>
	)
}
