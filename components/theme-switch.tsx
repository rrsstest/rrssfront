"use client";

import { FC } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@heroui/switch";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import clsx from "clsx";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps[ "classNames" ];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ( {
  className,
  classNames,
} ) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  // Chequeo de SSR y estado actual de tema
  const isLight = theme === "light" || isSSR;

  const onChange = () => {
    setTheme( isLight ? "dark" : "light" );
  };

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch( {
    isSelected: isLight,
    "aria-label": `Switch to ${ isLight ? "dark" : "light" } mode`,
    onChange,
  } );

  return (
    <Component
      { ...getBaseProps( {
        className: clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base,
        ),
      } ) }
    >
      <VisuallyHidden>
        <input { ...getInputProps() } />
      </VisuallyHidden>
      <div
        { ...getWrapperProps() }
        className={ slots.wrapper( {
          class: clsx(
            [
              "w-auto h-auto",
              "bg-transparent",
              "rounded-lg",
              "flex items-center justify-center gap-2",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-500",
              "pt-px",
              "px-0",
              "mx-0",
            ],
            classNames?.wrapper,
          ),
        } ) }
      >
        { !isLight ? (
          <>
            <SunFilledIcon size={ 22 } />
            <span className="select-none text-sm font-medium cursor-pointer">Tema claro</span>
          </>
        ) : (
          <>
            <MoonFilledIcon size={ 22 } />
            <span className="select-none text-sm font-medium cursor-pointer">Tema oscuro</span>
          </>
        ) }
      </div>
    </Component>
  );
};
