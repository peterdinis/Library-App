import { BookOpen } from "lucide-react";
import { FC } from "react";

const BooksHeader: FC = () => {
    return (
        <div className="mb-12 text-center">
            <div className="mb-4 flex items-center justify-center gap-4">
                <BookOpen className="h-12 w-12 text-indigo-600" />
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50">
                    Všetky knihy
                </h1>
            </div>
        </div>
    )
}

export default BooksHeader