"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { Badge } from "@heroui/badge";
import { Avatar } from "@heroui/avatar";
import { IoMailOutline } from "react-icons/io5";

export const MessagesDropdown = () => {
  return (
    <Dropdown placement="bottom-end">
      <Badge
        color="secondary"
        content="4"
        shape="circle"
      >
        <DropdownTrigger>
          <button className="p-2 rounded-full hover:bg-default-100 transition">
            <IoMailOutline className="w-6 h-6 text-default-600" />
          </button>
        </DropdownTrigger>
      </Badge>
      <DropdownMenu className="min-w-[280px]">
        <DropdownItem
          key="1"
          startContent={ <Avatar src="https://i.pravatar.cc/40?u=msg1" size="sm" /> }
        >
          Nuevo mensaje de Ana
        </DropdownItem>
        <DropdownItem
          key="2"
          startContent={ <Avatar src="https://i.pravatar.cc/40?u=msg2" size="sm" /> }
        >
          Juan: ¿Nos juntamos?
        </DropdownItem>
        <DropdownItem
          key="3"
          startContent={ <Avatar src="https://i.pravatar.cc/40?u=msg3" size="sm" /> }
        >
          Tienes un mensaje sin leer
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
