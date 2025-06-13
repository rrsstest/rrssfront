import type { ReactNode } from "react";

export interface IUserItemList {
  key:              string | number;
  avatarSrc?:       string;
  className?:       string;
  title:            ReactNode;
  subtitle?:        ReactNode;
  content?:         ReactNode;
  avatarColor?:     "primary" | "success" | "warning" | "default" | "danger" | "secondary";
  href?:            string;
}

export interface IGenericList {
  cardClassName?:          string;
  headerClassName?:        string;
  bodyClassName?:          string;
  accordionClassName?:     string;
  accordionItemClassName?: string;
  hideIndicator?:          boolean;
  title?:                  ReactNode;
  items:                   IUserItemList[];
  selectionMode?:          "single" | "multiple" | "none";
  icon?:                   ReactNode;
}