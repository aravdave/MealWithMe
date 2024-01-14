"use client";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider, Button } from "@chakra-ui/react";

export default function UserStatus({ user }: any) {
  const userName = user?.name;
  const avatarURL = user?.image;

  return (
    <Menu>
      <MenuButton transition="all 0.2s">
        <div className="flex flex-row space-x-4">
          <Image className="rounded-full" src={avatarURL!} width={35} height={35} alt="profile image" />
        </div>
      </MenuButton>
      <MenuList minW="0" w={"150px"} className="-mt-4">
        <div className="pl-3 text-lg">{userName}</div>
        <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
      </MenuList>
    </Menu>
  );
}
