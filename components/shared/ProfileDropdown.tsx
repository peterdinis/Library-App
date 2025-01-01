"use client";

import { useToast } from "@/hooks/useToast";
import { useUser } from "@clerk/nextjs";
import {
	Avatar,
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FC } from "react";

const ProfileDropdown: FC = () => {
	const { user } = useUser();
	const router = useRouter();
	const { toast } = useToast();

	const logoutUser = () => {
		toast({
			title: "Odhlásenie bolo úspešné",
			duration: 2000,
			className: "bg-green-800 text-white font-bold text-xl",
		});
		user?.delete();
		router.push("/");
	};

	return (
		<Dropdown>
			<DropdownTrigger>
				<Avatar src={user?.imageUrl!} />
			</DropdownTrigger>
			<DropdownMenu aria-label="Static Actions">
				<DropdownItem key="userName">{user?.fullName}</DropdownItem>
				<DropdownItem key="myBorrowedBooks">
					<Link href={"/bookings/me"}>Moje požičané knihy</Link>
				</DropdownItem>
				<DropdownItem key={"logout"}>
					<Button size="sm" onPress={logoutUser} color="primary" variant="flat">
						Odlhásenie
					</Button>
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};

export default ProfileDropdown;
