'use client';

import { Chip } from "@heroui/chip";
import { Tab, Tabs } from "@heroui/tabs";
import { IoChatboxOutline, IoImagesOutline } from 'react-icons/io5';

import { VideoIcon } from '../icons';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { PostContainer } from '../posts';

export const UserContent = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-[900px] flex flex-col items-center">
        <Tabs
          aria-label="Opciones"
          color="primary"
          variant="bordered"
          className="w-full flex flex-col items-center"
        >
          <Tab
            key="posts"
            title={
              <div className="flex items-center space-x-2">
                <IoChatboxOutline />
                <span>Publicaciones</span>
                <Chip size="sm" variant="faded">
                  9
                </Chip>
              </div>
            }
          >
            <div className="flex flex-col space-y-6">
              <PostContainer />
              <PostContainer />
              <PostContainer />
              <PostContainer />
              <PostContainer />
              <PostContainer />
            </div>
          </Tab>
          <Tab
            key="photos"
            title={
              <div className="flex items-center space-x-2">
                <IoImagesOutline size={ 24 } />
                <span>Fotos</span>
              </div>
            }
          >
            <Card className="w-full max-w-xl mx-auto mt-8">
              <CardHeader>
                Fotos
              </CardHeader>
              <CardBody>
                Galería de fotos...
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key="videos"
            title={
              <div className="flex items-center space-x-2">
                <VideoIcon />
                <span>Videos</span>
                <Chip size="sm" variant="faded">
                  1
                </Chip>
              </div>
            }
          >
            <Card className="w-full max-w-xl mx-auto mt-8">
              <CardHeader>
                Videos
              </CardHeader>
              <CardBody>
                Galería de videos...
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
