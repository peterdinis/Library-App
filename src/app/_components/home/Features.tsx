"use client"

import { FC } from "react";
import { Search, BookOpen, Users, GraduationCap } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import {motion} from "framer-motion"

const features = [
    {
        title: "Smart Search",
        description: "Find any book instantly with our AI-powered search engine.",
        icon: Search,
    },
    {
        title: "Digital Card",
        description: "Manage your library account and borrowings digitally.",
        icon: BookOpen,
    },
    {
        title: "Study Groups",
        description: "Create or join virtual study groups with classmates.",
        icon: Users,
    },
    {
        title: "Resources",
        description: "Access curriculum-aligned educational materials.",
        icon: GraduationCap,
    },
]

const Features: FC = () => {
    return (
        <section id="features">
        <div className="container">
            <div className="text-center">
                <span className="rounded-full bg-blue-100 dark:bg-blue-900 px-3 py-1 text-sm text-blue-600 dark:text-blue-100">
                    Features
                </span>
                <h2 className="mt-6 text-3xl font-bold sm:text-5xl">Everything You Need</h2>
                <p className="mt-4 text-muted-foreground md:text-lg max-w-[600px] mx-auto">
                    Discover all the tools and features designed to make your library experience seamless.
                </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Card className="relative h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                            <CardContent className="p-6">
                                <div className="size-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                                    <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-100" />
                                </div>
                                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
    )
}

export default Features