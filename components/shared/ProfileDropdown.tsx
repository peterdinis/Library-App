"use client"

import { FC } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";

const ProfileDropdown: FC = () => {
    const {user} = useUser()
    return (
        <Dropdown>
            <DropdownTrigger>
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">New file</DropdownItem>
                <DropdownItem key="copy">Copy link</DropdownItem>
                <DropdownItem key="edit">Edit file</DropdownItem>
                <DropdownItem key="delete" className="text-danger" color="danger">
                    Delete file
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default ProfileDropdown;