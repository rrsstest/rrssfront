"use client";

import { FC, ReactNode } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@heroui/switch";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import clsx from "clsx";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps[ "classNames" ];
  children?: ReactNode;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ( {
  className,
  classNames,
  children,
} ) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

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
    isSelected: !isLight,
    "aria-label": `Switch to ${ isLight ? "dark" : "light" } mode`,
    onChange,
  } );

  return (
    <Component
      { ...getBaseProps( {
        className: clsx(
          "w-full px-3 py-1.5 transition-opacity hover:opacity-80 cursor-pointer",
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
              "w-full h-auto",
              "bg-transparent",
              "rounded-lg",
              "flex items-center justify-between gap-2",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-500",
            ],
            classNames?.wrapper,
          ),
        } ) }
      >
        { children }
        { isSelected ? <SunFilledIcon size={ 22 } /> : <MoonFilledIcon size={ 22 } /> }
      </div>
    </Component>
  );
};