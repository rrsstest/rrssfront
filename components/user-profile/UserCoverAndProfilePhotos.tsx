import { Avatar } from '@heroui/avatar';
import { Button } from '@heroui/button';
import { Image } from '@heroui/image';
import { IoPersonAddOutline } from 'react-icons/io5';

interface Props {
  username: string;
  avatarUrl: string;
  coverUrl: string;
  description?: string;
}

export const UserCoverAndProfilePhotos = ( {
  username,
  avatarUrl,
  coverUrl,
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam excepturi reprehenderit explicabo sapiente nihil minus quidem in architecto! Explicabo debitis aspernatur molestiae quas molestias nam ut distinctio ad adipisci exercitationem!",
}: Props ) => {
  return (
    <div className="w-full flex flex-col items-center mt-8 mb-14 p-3 md:p-0">
      <div className="relative w-full flex justify-center">
        <Image
          isBlurred
          alt="Portada usuario"
          className="w-[1300px] h-[450px] rounded-2xl shadow-xl object-cover"
          src={ coverUrl }
        />
        <div
          className="
            absolute
            left-1/2
            -translate-x-1/2
            bottom-0
            translate-y-1/2
            z-20
            flex
            flex-col
            items-center
            w-full
            pt-12
            md:pt-8
          "
        >
          <div className="pt-8 md:hidde"></div>
          <Avatar
            isBordered
            color="secondary"
            size="lg"
            src={ avatarUrl }
            className="
              shadow-2xl
              border-4
              border-white
              w-40
              h-40
              bg-white
            "
          />
          <div className="mt-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-foreground">{ username }</span>
            <Button className="mt-1" color="primary" startContent={ <IoPersonAddOutline size="18" /> }>Seguir</Button>
            <p className="
              mt-2
              text-base
              max-w-2xl
              text-center
              text-foreground/80
              px-2
              font-normal
              leading-snug
            ">
              { description }
            </p>
          </div>
        </div>
      </div>
      <div className="h-32 mt-10 md:mt-4" />
    </div>
  );
};