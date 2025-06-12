'use client';

import { useRouter } from "next/navigation";
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card';
import { Image } from "@heroui/image";
import { Divider } from '@heroui/divider';
import { Link } from '@heroui/link';
import { IoChatbubbleOutline, IoHeartOutline, IoShareOutline } from 'react-icons/io5';

export const PostContainer = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push( "/publicacion/abc123" );
  };

  return (
    <Card
      className="w-full max-w-3xl flex flex-col cursor-pointer group"
      isBlurred
      isPressable
    >
      <div
        className="flex flex-col flex-1"
        onClick={ handleNavigate }
        style={ { cursor: 'pointer' } }
        tabIndex={ 0 }
        role="button"
        aria-label="Ver publicación"
      >
        <CardHeader className="flex gap-3">
          <Image
            alt="heroui logo"
            height={ 40 }
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={ 40 }
            isBlurred
          />
          <div className="flex flex-col">
            <p className="text-md">HeroUI</p>
            <p className="text-small text-default-500">heroui.com</p>
          </div>
        </CardHeader>
        <Divider />
        <div className="w-full aspect-[16/8] bg-neutral-900 flex-1 flex items-center justify-center p-0">
          <Image
            isBlurred
            alt="HeroUI Album Cover"
            className="w-full h-full object-cover rounded-none"
            src="https://pbs.twimg.com/media/GtBhhrMXsAAJAy6?format=jpg&name=medium"
          />
        </div>
        <CardBody className="p-6 pb-2">
          <p className="text-lg">Make beautiful websites regardless of your design experience.</p>
        </CardBody>
      </div>
      <Divider />
      <CardFooter className="flex flex-row justify-start items-center space-x-3 pl-4">
        <div className="flex flex-row space-x-2">
          <IoHeartOutline size="24" />
          3
        </div>
        <div className="flex flex-row space-x-2">
          <IoChatbubbleOutline size="24" />
          10
        </div>
        <div className="flex flex-row space-x-2">
          <IoShareOutline size="24" />
        </div>
      </CardFooter>
    </Card>
  );
};
