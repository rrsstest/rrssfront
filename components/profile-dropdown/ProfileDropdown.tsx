'use client';

import { Avatar } from '@heroui/avatar';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown';
import { User } from '@heroui/user';
import { signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import {
  IoHelpCircleOutline,
  IoLogOutOutline,
  IoSettingsOutline,
} from 'react-icons/io5';

import { ThemeSwitch } from '../theme-switch';

export const ProfileDropdown = () => {

  const { data: session } = useSession();
  const { theme } = useTheme();
  const iconClasses = "w-5 h-5 text-slate-600 dark:text-slate-400";

  if ( !session?.user ) {
    return null;
  }

  const { user } = session;

  return (
    <Dropdown className="ml-1" placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          className="transition-transform cursor-pointer"
          isBordered
          src={ user.image ?? undefined }
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Acciones de Perfil" variant="flat">
        <DropdownItem
          className="h-16 gap-3"
          href="/perfil"
          key="profile"
          textValue="Mi Perfil"
        >
          <User
            avatarProps={ {
              src: user.image ?? undefined,
            } }
            classNames={ {
              name: "font-bold",
              description: "text-default-500"
            } }
            description={ user.email ?? '' }
            name={ user.name ?? 'Usuario' }
          />
        </DropdownItem>

        <DropdownItem key="settings" href="/ajustes" startContent={ <IoSettingsOutline className={ iconClasses } /> } textValue="Ajustes">
          Ajustes
        </DropdownItem>

        <DropdownItem key="help" href="/ayuda" startContent={ <IoHelpCircleOutline className={ iconClasses } /> } textValue="Ayuda y Feedback">
          Ayuda y Feedback
        </DropdownItem>

        <DropdownItem isReadOnly className="p-0" key="theme-switch" textValue="Cambiar Tema">
          <ThemeSwitch>
            <span className="text-sm text-slate-800 dark:text-slate-200">
              { theme === 'light' ? 'Cambiar a Modo Oscuro' : 'Cambiar a Modo Claro' }
            </span>
          </ThemeSwitch>
        </DropdownItem>

        <DropdownItem
          className="text-danger"
          color="danger"
          key="logout"
          startContent={ <IoLogOutOutline className="w-5 h-5" /> }
          textValue="Cerrar sesión"
          onClick={ () => signOut( { callbackUrl: "/" } ) }
        >
          Cerrar sesión
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};