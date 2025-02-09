import { FC } from "react";
import { motion } from "framer-motion"
import { BookOpen, Calendar, User } from "lucide-react"
import Link from "next/link"
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "~/components/ui/card";

interface Book {
    id: number
    title: string
    author: string
    dueDate: string
    coverUrl: string
}

const borrowedBooks: Book[] = [
    {
        id: 1,
        title: "Harry Potter a Kameň mudrcov",
        author: "J.K. Rowling",
        dueDate: "2024-02-20",
        coverUrl: "/placeholder.svg?height=200&width=150",
    },
    {
        id: 2,
        title: "Pán prsteňov",
        author: "J.R.R. Tolkien",
        dueDate: "2024-02-22",
        coverUrl: "/placeholder.svg?height=200&width=150",
    },
    {
        id: 3,
        title: "Malý princ",
        author: "Antoine de Saint-Exupéry",
        dueDate: "2024-02-25",
        coverUrl: "/placeholder.svg?height=200&width=150",
    },
]

const ProfileWrapper: FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="container mx-auto">
                <div className="mb-6 flex items-center justify-between">
                    <Link href="/">
                        <Button variant="outline">← Späť domov</Button>
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-lg bg-white p-6 shadow-lg"
                >
                    <div className="mb-8 flex items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold">Ján Novák</h1>
                            <p className="text-muted-foreground">Študentské číslo: 12345</p>
                        </div>
                    </div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
                        <h2 className="mb-6 text-xl font-semibold">Požičané knihy</h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {borrowedBooks.map((book, index) => (
                                <motion.div
                                    key={book.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                                >
                                    <Card className="group relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
                                        <CardHeader className="relative">
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.2 }}
                                                className="relative aspect-[3/4] overflow-hidden rounded-md"
                                            >
                                                <img
                                                    src={book.coverUrl || "/placeholder.svg"}
                                                    alt={book.title}
                                                    className="absolute inset-0 h-full w-full object-cover"
                                                />
                                            </motion.div>
                                        </CardHeader>
                                        <CardContent>
                                            <CardTitle className="line-clamp-1">{book.title}</CardTitle>
                                            <CardDescription className="mt-2 flex items-center gap-2">
                                                <BookOpen className="h-4 w-4" />
                                                {book.author}
                                            </CardDescription>
                                            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                                                <Calendar className="h-4 w-4" />
                                                Vrátiť do: {new Date(book.dueDate).toLocaleDateString()}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default ProfileWrapper