'use client';

import Link from 'next/link';
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card';
import { Image } from "@heroui/image";
import { Avatar } from "@heroui/avatar";
import { IoChatbubbleOutline, IoHeartOutline, IoShareOutline } from 'react-icons/io5';

interface PostAuthor {
  name: string;
  handle: string;
  avatarUrl: string;
}

interface PostStats {
  likes: number;
  comments: number;
}

export interface Post {
  id: string;
  author: PostAuthor;
  content: string;
  imageUrl: string;
  stats: PostStats;
}

interface Props {
  post: Post;
}

export const PostContainer = ( { post }: Props ) => {
  return (
    <Card className="w-full h-auto transition-shadow duration-300 hover:shadow-xl bg-white/80 dark:bg-slate-900/80 p-0" >
      <Link href={ `/publicacion/${ post.id }` } className="block cursor-pointer group">
        <CardHeader className="flex gap-4 px-6 pt-4">
          <Avatar src={ post.author.avatarUrl } size="md" />
          <div className="flex flex-col">
            <p className="text-md font-semibold text-slate-900 dark:text-slate-100">{ post.author.name }</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">@{ post.author.handle }</p>
          </div>
        </CardHeader>
        <CardBody className="px-6">
          <p className="text-base text-slate-800 dark:text-slate-200">{ post.content }</p>
          <Image
            alt="Contenido de la publicación"
            className="w-full h-auto object-cover rounded-lg mt-4"
            src={ post.imageUrl }
          />
        </CardBody>
      </Link>
      <CardFooter className="flex flex-row justify-start items-center gap-x-6 px-6 pb-4 pt-2">
        <button
          onClick={ ( e ) => e.stopPropagation() }
          className="flex items-center gap-2 text-slate-600 dark:text-slate-400 transition-colors hover:text-red-500 dark:hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-full"
        >
          <IoHeartOutline className="w-6 h-6" />
          <span className="font-semibold text-sm">{ post.stats.likes }</span>
        </button>
        <button
          onClick={ ( e ) => e.stopPropagation() }
          className="flex items-center gap-2 text-slate-600 dark:text-slate-400 transition-colors hover:text-blue-500 dark:hover:text-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full"
        >
          <IoChatbubbleOutline className="w-6 h-6" />
          <span className="font-semibold text-sm">{ post.stats.comments }</span>
        </button>
        <button
          onClick={ ( e ) => e.stopPropagation() }
          className="flex items-center gap-2 text-slate-600 dark:text-slate-400 transition-colors hover:text-green-500 dark:hover:text-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded-full"
        >
          <IoShareOutline className="w-6 h-6" />
        </button>
      </CardFooter>
    </Card>
  );
};