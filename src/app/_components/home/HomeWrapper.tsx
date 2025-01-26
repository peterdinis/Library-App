"use client"

import { FC } from "react";
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

const HomeWrapper: FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-zinc-900 dark:to-stone-800">
            <main>
                {/* Hero Section */}
                <section className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
                    <div className="container relative pt-20 pb-32 md:pt-32 md:pb-40">
                        <div className="grid gap-10 lg:grid-cols-[1fr_500px] items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-col gap-6"
                            >
                                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
                                    🎉 <span className="ml-2">Vitajte v školskej knižnici</span>
                                </div>
                                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                                    SPŠT 
                                    <br />
                                    Knižnica
                                </h1>
                                <p className="text-lg text-muted-foreground md:text-xl max-w-[600px]">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, eos.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                        Všetky knihy
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                    <Button size="lg" variant="outline">
                                        Návrat na školskú stránku
                                    </Button>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                                className="relative mx-auto lg:mr-0 w-full max-w-[500px]"
                            >
                                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 opacity-30 blur" />
                                <Card className="relative overflow-hidden border-2">
                                    image
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default HomeWrapper