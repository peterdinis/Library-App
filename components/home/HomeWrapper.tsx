"use client";

import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import schollImage from "../../public/img/main.png";

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
			className="container relative mx-auto px-4 xl:px-0"
		>
			<div className="flex flex-col-reverse items-center md:flex-row md:items-start">
				{/* Text Section */}
				<div className="md:w-3/5 md:pt-24 lg:py-32">
					<h1 className="text-center text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-blue-50 md:w-11/12 md:text-left md:text-5xl lg:text-6xl xl:text-7xl">
						SPŠT Knižnica
					</h1>
					<h2 className="py-4 text-center text-lg text-gray-700 dark:text-blue-50 md:w-10/12 md:py-8 md:text-left lg:text-2xl">
						<q>Knihy sú jedinečne prenosné kúzlo</q> - Stephen King
					</h2>
					<div className="flex flex-col items-center gap-4 md:flex-row md:justify-start">
						<Button
							size="lg"
							variant="flat"
							className="w-full bg-green-700 text-blue-50 md:w-auto"
						>
							<Link href="/books">Zobraziť všekty knihy</Link>
						</Button>
						<Button
							size="lg"
							variant="flat"
							className="w-full bg-orange-600 text-white md:w-auto"
						>
							<Link href="https://www.spsbj.sk/">Školská stránka</Link>
						</Button>
					</div>
				</div>
				{/* Image Section */}
				<div className="flex items-center justify-center sm:w-3/5 md:w-2/5">
					<Image
						src={schollImage}
						alt="Scholl homepage"
						width={1200}
						loading="lazy"
						height={1200}
						priority={true}
						className="h-auto w-full max-w-xs sm:max-w-md md:max-w-full"
					/>
				</div>
			</div>
		</motion.div>
	);
};

export default Hero;
