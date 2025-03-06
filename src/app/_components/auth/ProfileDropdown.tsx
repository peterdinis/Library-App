"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import type { FC } from "react";
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

    signOut({
      callbackUrl: "/",
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
    </>
  );
};

export default ProfileDropdown;
