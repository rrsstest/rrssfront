'use client';

import { Chip } from "@heroui/chip";
import { Tab, Tabs } from "@heroui/tabs";
import { IoChatboxOutline, IoImagesOutline, IoVideocamOutline } from 'react-icons/io5';
import { PhotosGallery } from '../photos-gallery';
import { Card, CardBody } from '@heroui/card';
import { Post, PostContainer } from '../posts';

interface Props {
  posts: Post[]; // Usar la interfaz Post
  photos: any[];
  videos: any[];
}

export const UserContent = ( { posts, photos, videos }: Props ) => {
  const tabsConfig = [
    {
      key: 'posts',
      icon: <IoChatboxOutline className="w-5 h-5" />,
      title: 'Publicaciones',
      count: posts.length,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          { posts.map( ( post ) => (
            <PostContainer key={ post.id } post={ post } />
          ) ) }
        </div>
      ),
    },
    {
      key: 'photos',
      icon: <IoImagesOutline className="w-5 h-5" />,
      title: 'Fotos',
      count: photos.length,
      content: <PhotosGallery />,
    },
    {
      key: 'videos',
      icon: <IoVideocamOutline className="w-5 h-5" />,
      title: 'Videos',
      count: videos.length,
      content: (
        <Card>
          <CardBody className="flex justify-center items-center h-64">
            <p className="text-slate-500">Galería de videos proximamente...</p>
          </CardBody>
        </Card>
      ),
    },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <Tabs
        aria-label="Contenido del usuario"
        items={ tabsConfig }
        color="primary"
        variant="underlined"
        classNames={ {
          tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-blue-600 dark:bg-blue-500",
          tab: "max-w-fit px-2 h-12",
        } }
      >
        { ( item ) => (
          <Tab
            key={ item.key }
            title={
              <div className="flex items-center space-x-2">
                { item.icon }
                <span>{ item.title }</span>
                { item.count > 0 && (
                  <Chip size="sm" variant="faded">
                    { item.count }
                  </Chip>
                ) }
              </div>
            }
          >
            <div className="py-6">
              { item.content }
            </div>
          </Tab>
        ) }
      </Tabs>
    </div>
  );
};