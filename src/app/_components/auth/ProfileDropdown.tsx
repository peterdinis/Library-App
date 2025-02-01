"use client";

import Link from "next/link";
import { FC } from "react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useToast } from "~/hooks/use-toast";

const ProfileDropdown: FC = () => {
  const { toast } = useToast();

  const logoutFromApp = () => {
    toast({
      title: "Odhlásenie bolo úspešné",
      duration: 2000,
      className: "bg-green-800 text-white font-bold text-xl",
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={"/profile"}>Profil</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/books/borrowed">Požičané knihy</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logoutFromApp}>
            Odhlásenie
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileDropdown;
