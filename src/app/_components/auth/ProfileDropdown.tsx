"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import type { FC } from "react";
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

  const { data: session } = useSession();

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
        <DropdownMenuTrigger>Profil</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Môj Profil</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={"/profile"}>Profil</Link>
          </DropdownMenuItem>
          {session?.user.role === "ADMIN" && (
            <DropdownMenuItem>
              <Link href={"/admin"}>Admin časť</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={logoutFromApp}>
            Odhlásenie
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileDropdown;
