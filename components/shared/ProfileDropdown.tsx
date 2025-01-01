"use client"

import { FC } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Button } from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/hooks/useToast";

const ProfileDropdown: FC = () => {
    const {user} = useUser();
    const router = useRouter();
    const {toast} = useToast()

    const logoutUser = () => {
        toast({
            title: "Odhlásenie bolo úspešné",
            duration: 2000,
            className: "bg-green-800 text-white font-bold text-xl"
        })
        router.push("/");
    }

    return (
        <Dropdown>
            <DropdownTrigger>
                <Avatar src={user?.imageUrl}/>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="userName">{user?.fullName}</DropdownItem>
                <DropdownItem key="myBorrowedBooks">
                    <Link href={"/bookings/me"}>Moje požičané knihy</Link>
                </DropdownItem>
                <DropdownItem key={"logout"}>
                    <Button onPress={logoutUser} color="primary" variant="flat">Odlhásenie</Button>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default ProfileDropdown;