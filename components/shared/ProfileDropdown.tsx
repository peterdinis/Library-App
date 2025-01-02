"use client";

import { useToast } from "@/hooks/useToast";
import { useUser, useClerk } from "@clerk/nextjs";
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
	const {signOut} = useClerk();
  
	const logoutUser = async () => {
	  await signOut();
	  toast({
		title: "Odhlásenie bolo úspešné",
		duration: 2000,
		className: "bg-green-800 text-white font-bold text-xl",
	  });
	  router.push("/"); // Redirect the user to the homepage
	};
  
	return (
	  <Dropdown>
		<DropdownTrigger>
		  <Avatar src={user?.imageUrl!} />
		</DropdownTrigger>
		<DropdownMenu>
		  <DropdownItem key="userName">{user?.fullName}</DropdownItem>
		  <DropdownItem key="myBorrowedBooks">
			<Link href={"/bookings/me"}>Moje požičané knihy</Link>
		  </DropdownItem>
		  <DropdownItem key={"logout"}>
			<Button size="sm" onPress={logoutUser} color="primary" variant="flat">
			  Odhlásenie
			</Button>
		  </DropdownItem>
		</DropdownMenu>
	  </Dropdown>
	);
  };
  
  export default ProfileDropdown;