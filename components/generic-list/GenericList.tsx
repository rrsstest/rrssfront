"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { Avatar } from "@heroui/avatar";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import clsx from "clsx";
import Link from "next/link";

import { IGenericList } from './interfaces';



export function GenericList( {
  cardClassName,
  headerClassName,
  bodyClassName,
  accordionClassName,
  accordionItemClassName,
  hideIndicator = true,
  title = "Lista",
  items,
  selectionMode = "none",
  icon = ""
}: IGenericList ) {
  return (
    <Card
      isBlurred
      className={ cardClassName ?? "border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]" }
      shadow="sm"
    >
      { title && (
        <CardHeader className={ headerClassName ?? "flex justify-center flex-row items-center" }>
          <Image
            alt="heroui logo"
            height={ 35 }
            radius="sm"
            src={ icon }
            width={ 35 }
            className="mt-1"
          />
          <h1 className="text-xl">{ title }</h1>
        </CardHeader>
      ) }

      <CardBody className={ bodyClassName }>
        <Accordion
          selectionMode={ selectionMode }
          className={ accordionClassName }
          itemClasses={ {
            indicator: hideIndicator ? "hidden" : undefined,
          } }
        >
          { items.map( ( item ) => (
            <AccordionItem
              key={ item.key }
              aria-label={ typeof item.title === "string" ? item.title : undefined }
              startContent={
                item.avatarSrc ? (
                  <Link href="/comunidad/abc123">
                    <Avatar
                      isBordered
                      color={ item.avatarColor ?? "default" }
                      radius="lg"
                      src={ item.avatarSrc }
                    />
                  </Link>
                ) : undefined
              }
              title={ <Link href="/comunidad/abc123">item.title</Link> }
              subtitle={ <Link href="/comunidad/abc123">item.subtitle</Link> }
              className={ clsx( accordionItemClassName, item.className, item.href && "cursor-pointer" ) }
            >
              { item.href ? (
                <Link href="/comunidad/abc123" className="block w-full h-full" >
                  { item.content }
                </Link>
              ) : (
                item.content
              ) }
            </AccordionItem>
          ) ) }
        </Accordion>
      </CardBody>
    </Card>
  );
}
