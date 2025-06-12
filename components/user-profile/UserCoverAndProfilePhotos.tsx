import { Avatar } from '@heroui/avatar';
import { Image } from '@heroui/image';



interface Props {
  username: string;
  avatarUrl: string;
  coverUrl: string;
}

export const UserCoverAndProfilePhotos = ( {
  username,
  avatarUrl,
  coverUrl,
}: Props ) => {
  return (
    <div className="w-full  mt-6">
      <div className="w-full px-4">
        <div className="relative flex justify-center">
          <Image
            isBlurred
            alt="Portada usuario"
            className="w-[1300px] h-[450px]"
            src={ coverUrl }
          />
          <div className="absolute -bottom-20 z-20">
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
            <div className="pt-2 pb-4 px-8">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-foreground">{ username }</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};