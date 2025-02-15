"use client"

import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { FC } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "~/hooks/use-toast";

const AdminProfileDropdown: FC = () => {
    const { toast } = useToast();
	const router = useRouter()

	const logoutFromApp = () => {
		toast({
			title: "Odhlásenie bolo úspešné",
			duration: 2000,
			className: "bg-green-800 text-white font-bold text-xl",
		});
		signOut()
		router.push("/")
	};

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>JD</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href={"/profile"}>Profil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logoutFromApp}>
                    Odhlásenie
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AdminProfileDropdown