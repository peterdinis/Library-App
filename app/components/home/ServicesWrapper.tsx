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
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="bg-gray-100 shadow-md py-8 md:py-12 dark:bg-foreground-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            tabIndex={0}
            aria-label="group of cards"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            initial="hidden"
            animate="visible"
            variants={servicesVariant}
          >
            {/* Card 1 */}
            <motion.div
              tabIndex={0}
              aria-label="card 1"
              className="flex flex-col items-center p-6  dark:bg-foreground-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              variants={cardVariant}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900">
                <Home className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <h4
                tabIndex={0}
                className="mt-4 text-lg font-medium text-gray-800 dark:text-blue-50 text-center"
              >
                Doma Objednáš
              </h4>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              tabIndex={0}
              aria-label="card 2"
              className="flex flex-col items-center p-6  dark:bg-foreground-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              variants={cardVariant}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900">
                <School2 className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <h4
                tabIndex={0}
                className="mt-4 text-lg font-medium text-gray-800 dark:text-blue-50 text-center"
              >
                V škole vyzdhvineš
              </h4>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              tabIndex={0}
              aria-label="card 3"
              className="flex flex-col items-center p-6  dark:bg-foreground-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 sm:col-span-2 lg:col-span-1"
              variants={cardVariant}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900">
                <span role="img" aria-label="eyes" className="text-2xl">
                  👀
                </span>
              </div>
              <h4
                tabIndex={0}
                className="mt-4 text-lg font-medium text-gray-800 dark:text-blue-50 text-center"
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