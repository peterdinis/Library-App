"use client";

import { motion } from "framer-motion";
import { Home, School2 } from "lucide-react";
import type { FC } from "react";

const ServicesWrapper: FC = () => {
	const servicesVariant = {
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
		<div className="overflow-y-hidden">
			<div className="bg-gray-100 py-12 dark:bg-foreground-50">
				<div className="max-w-8xl container mx-auto">
					<motion.div
						tabIndex={0}
						aria-label="group of cards"
						className="flex flex-wrap items-center justify-center focus:outline-none sm:justify-between gap-8"
						initial="hidden"
						animate="visible"
					>
						{/* Card 1 */}
						<motion.div
							tabIndex={0}
							aria-label="card 1"
							className="flex items-center flex-col px-6 py-6 focus:outline-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 md:py-0"
							variants={servicesVariant}
						>
							<Home className="h-7 w-7" />
							<h4
								tabIndex={0}
								className="pt-5 dark:text-blue-50 text-center text-lg font-medium leading-6 text-gray-800 focus:outline-none"
							>
								Doma Objednáš
							</h4>
						</motion.div>

						{/* Card 2 */}
						<motion.div
							tabIndex={0}
							aria-label="card 2"
							className="flex items-center flex-col px-6 py-6 focus:outline-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 md:py-0"
							variants={servicesVariant}
						>
							<School2 className="h-7 w-7" />
							<h4
								tabIndex={0}
								className="pt-5 dark:text-blue-50 text-center text-lg font-medium leading-6 text-gray-800 focus:outline-none"
							>
								V škole vyzdhvineš
							</h4>
						</motion.div>

						{/* Card 3 */}
						<motion.div
							tabIndex={0}
							aria-label="card 3"
							className="flex items-center flex-col px-6 py-6 focus:outline-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 md:py-0"
							variants={servicesVariant}
						>
							<span role="img" aria-label="eyes" className="text-2xl">
								👀
							</span>
							<h4
								tabIndex={0}
								className="pt-5 dark:text-blue-50 text-center text-lg font-medium leading-6 text-gray-800 focus:outline-none"
							>
								Ľahké že ?
							</h4>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default ServicesWrapper;
