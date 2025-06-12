'use client';

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/dropdown';
import { User } from '@heroui/user';
import { Avatar } from '@heroui/avatar';
import { ThemeSwitch } from '../theme-switch';
import { useTheme } from 'next-themes';
import {
  IoPersonCircleOutline,
  IoSettingsOutline,
  IoHelpCircleOutline,
  IoLogOutOutline,
} from 'react-icons/io5';

const mockUser = {
  name: 'Tony Reichert',
  handle: '@tonyreichert',
  avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
};

export const ProfileDropdown = () => {
  const { theme } = useTheme();
  const iconClasses = "w-5 h-5 text-slate-600 dark:text-slate-400";

  return (
    <Dropdown placement="bottom-end" className="ml-1">
      <DropdownTrigger>
        <Avatar
          isBordered
          src={ mockUser.avatarUrl }
          className="transition-transform cursor-pointer"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Acciones de Perfil" variant="flat">
        <DropdownItem
          key="profile"
          href="/perfil"
          className="h-16 gap-3"
          textValue="Mi Perfil"
        >
          <User
            name={ mockUser.name }
            description={ mockUser.handle }
            avatarProps={ {
              src: mockUser.avatarUrl,
            } }
            classNames={ {
              name: "font-bold",
              description: "text-default-500"
            } }
          />
        </DropdownItem>

        <DropdownItem key="settings" href="/ajustes" startContent={ <IoSettingsOutline className={ iconClasses } /> } textValue="Ajustes">
          Ajustes
        </DropdownItem>

        <DropdownItem key="help" href="/ayuda" startContent={ <IoHelpCircleOutline className={ iconClasses } /> } textValue="Ayuda y Feedback">
          Ayuda y Feedback
        </DropdownItem>

        <DropdownItem key="theme-switch" isReadOnly className="p-0" textValue="Cambiar Tema">
          <ThemeSwitch>
            <span className="text-sm text-slate-800 dark:text-slate-200">
              { theme === 'light' ? 'Cambiar a Modo Oscuro' : 'Cambiar a Modo Claro' }
            </span>
          </ThemeSwitch>
        </DropdownItem>

        <DropdownItem
          key="logout"
          color="danger"
          startContent={ <IoLogOutOutline className="w-5 h-5" /> }
          className="text-danger"
          textValue="Cerrar sesión"
        >
          Cerrar sesión
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};