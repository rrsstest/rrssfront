import type { ReactNode } from "react";

export interface IUserItemList {
  key:             string | number;
  avatarSrc?:      string;
  className?:      string;
  title:           ReactNode;
  subtitle?:       ReactNode;
  content?:        ReactNode;
  avatarColor?:    "primary" | "success" | "warning" | "default" | "danger" | "secondary";
}

export interface IGenericList {
  accordionClassName?:    string;
  accordionItemClassName?:string;
  bodyClassName?:         string;
  cardClassName?:         string;
  headerClassName?:       string;
  icon:                   string;
  hideIndicator?:         boolean;
  title?:                 ReactNode;
  items:                  IUserItemList[];
  selectionMode?:         "single" | "multiple" | "none";
}
