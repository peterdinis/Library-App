"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { Button } from "~/components/ui/button";
import schollImage from "../../../public/img/main.png";

const Hero: FC = () => {
	const homepageVariants = {
		hidden: { opacity: 0, scale: 0.9 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.5,
			},
		},
	};

	return (
		<motion.div
			variants={homepageVariants}
			initial="hidden"
			animate="visible"
			className="container relative z-0 mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20 xl:px-0"
		>
			<div className="flex flex-col-reverse gap-8 md:flex-row md:items-center md:gap-12">
				<div className="w-full space-y-4 md:w-3/5 md:space-y-6 lg:space-y-8">
					<h1 className="text-heading-color text-center text-4xl font-black leading-tight tracking-tighter text-gray-900 dark:text-blue-50 sm:text-5xl md:text-left md:text-6xl lg:text-7xl xl:text-8xl">
						SPŠT Knižnica
					</h1>

					<h2 className="prose max-w-none text-center text-lg text-gray-700 dark:text-blue-50 sm:text-xl md:text-left lg:text-2xl">
						<q className="italic">
							Knihy sú jedinečne prenosné kúzlo - Stephen King
						</q>
					</h2>

					<div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
						<Button
							id="bookBtn"
							size="lg"
							variant="default"
							className="w-full sm:w-auto"
						>
							<Link href="/books" className="w-full">
								Zobraziť všekty knihy
							</Link>
						</Button>
						<Button
							id="schollBtn"
							size="lg"
							variant="secondary"
							className="w-full sm:w-auto"
						>
							<Link href="https://www.spsbj.sk/" className="w-full">
								Školská stránka
							</Link>
						</Button>
					</div>
				</div>

				<div className="w-full md:w-2/5">
					<div className="relative mx-auto aspect-square w-full max-w-[500px] overflow-hidden rounded-2xl">
						<Image
							src={schollImage || "/placeholder.svg"}
							alt="Scholl homepage"
							fill
							className="object-cover object-center"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							priority
						/>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default Hero;
