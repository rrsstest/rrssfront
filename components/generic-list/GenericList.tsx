"use client";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Avatar } from "@heroui/avatar";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import clsx from "clsx";

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
        <CardHeader className={ headerClassName ?? "flex justify-center flex-col" }>
          <Image
            alt="heroui logo"
            height={ 40 }
            radius="sm"
            src={ icon }
            width={ 40 }
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
                  <Avatar
                    isBordered
                    color={ item.avatarColor ?? "default" }
                    radius="lg"
                    src={ item.avatarSrc }
                  />
                ) : undefined
              }
              title={ item.title }
              subtitle={ item.subtitle }
              className={ clsx( accordionItemClassName, item.className ) }
            >
              { item.content }
            </AccordionItem>
          ) ) }
        </Accordion>
      </CardBody>
    </Card>
  );
}
