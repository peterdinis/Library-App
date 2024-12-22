import { Input } from "@nextui-org/react";
import { FC } from "react";
import { Search } from "lucide-react";

const BooksSearch: FC = () => {
    return (
        <div className="border-none outline-none mt-2">
            <Input startContent={<Search />}  variant="underlined" placeholder="Hľadaj knihu..." />
        </div>
    )
}

export default BooksSearch