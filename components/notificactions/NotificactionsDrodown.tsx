"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { Badge } from "@heroui/badge";
import { Avatar } from "@heroui/avatar";
import { IoNotificationsOutline } from "react-icons/io5";

export const NotificationsDropdown = () => {
  return (
    <Dropdown placement="bottom-end">
      <Badge
        color="secondary"
        content="3"
        shape="circle"
      >
        <DropdownTrigger>
          <button className="p-2 rounded-full hover:bg-default-100 transition">
            <IoNotificationsOutline className="w-6 h-6 text-default-600" />
          </button>
        </DropdownTrigger>
      </Badge>
      <DropdownMenu className="min-w-[280px]">
        <DropdownItem
          key="1"
          startContent={ <Avatar src="https://i.pravatar.cc/40?u=notif1" size="sm" /> }
        >
          Nuevo comentario en tu post
        </DropdownItem>
        <DropdownItem
          key="2"
          startContent={ <Avatar src="https://i.pravatar.cc/40?u=notif2" size="sm" /> }
        >
          Alguien te mencionó
        </DropdownItem>
        <DropdownItem
          key="3"
          startContent={ <Avatar src="https://i.pravatar.cc/40?u=notif3" size="sm" /> }
        >
          Tienes una nueva solicitud
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
