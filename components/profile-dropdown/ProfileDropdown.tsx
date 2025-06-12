'use client';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/dropdown';
import { User } from '@heroui/user';

import { ThemeSwitch } from '../theme-switch';
import { Link } from '@heroui/link';


export const ProfileDropdown = () => {
  return (
    <Dropdown placement="bottom-start" className="ml-1">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={ {
            isBordered: true,
            src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
          } }
          className="transition-transform"
          description="@tonyreichert"
          name="Tony Reichert"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <Link href="/abc123" color="foreground">
            <div className="flex flex-col space-x-1">
              <h3 className="ml-2">Nate Gentile</h3>
              <h3 className="font-bold">@tonyreichert</h3>
            </div>
          </Link>
        </DropdownItem>
        <DropdownItem key="help_and_feedback"><ThemeSwitch /></DropdownItem>
        <DropdownItem key="logout" color="danger">
          Cerrar sesión
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

