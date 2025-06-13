"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import Link from "next/link";
import { ReactNode } from "react";

import { IGenericList, IUserItemList } from './interfaces';

const ListItem = ( { item }: { item: IUserItemList; } ) => {
  const content = (
    <div className="flex items-center gap-4 w-full">
      { item.avatarSrc && (
        <Avatar
          radius="lg"
          src={ item.avatarSrc }
          className="flex-shrink-0"
        />
      ) }
      <div className="flex flex-col flex-grow truncate">
        <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">{ item.title }</div>
        { item.subtitle && <div className="text-sm text-slate-500 dark:text-slate-400 truncate">{ item.subtitle }</div> }
      </div>
    </div>
  );

  if ( item.href ) {
    return (
      <Link
        href={ item.href }
        className="block p-3 rounded-lg transition-colors hover:bg-slate-200/60 dark:hover:bg-slate-700/60"
      >
        { content }
      </Link>
    );
  }

  return <div className="p-3">{ content }</div>;
};

export function GenericList( {
  cardClassName,
  headerClassName,
  bodyClassName,
  title = "Lista",
  items,
  icon = null
}: IGenericList ) {
  return (
    <Card
      isBlurred
      className={ cardClassName ?? "border-none bg-white/70 dark:bg-slate-900/70" }
      shadow="sm"
    >
      { title && (
        <CardHeader className={ headerClassName ?? "flex justify-center items-center gap-3 p-4" }>
          { icon && (
            <div className="text-slate-900 dark:text-slate-100 w-7 h-7">
              { icon }
            </div>
          ) }
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{ title }</h2>
        </CardHeader>
      ) }
      <CardBody className={ bodyClassName ?? "p-2" }>
        <div className="flex flex-col gap-1">
          { items.map( ( item ) => (
            <ListItem key={ item.key } item={ item } />
          ) ) }
        </div>
      </CardBody>
    </Card>
  );
}