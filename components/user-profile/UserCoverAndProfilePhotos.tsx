import { Avatar } from '@heroui/avatar';
import { Button } from '@heroui/button';
import { IoPersonAddOutline } from 'react-icons/io5';

const formatNumber = ( num: number ): string => {
  return new Intl.NumberFormat( 'es-ES', {
    notation: 'compact',
    maximumFractionDigits: 1,
  } ).format( num );
};

interface Props {
  username: string;
  avatarUrl: string;
  coverUrl: string;
  description?: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}

export const UserCoverAndProfilePhotos = ( {
  username,
  avatarUrl,
  coverUrl,
  description,
  stats,
}: Props ) => {
  return (
    <div className="w-full mb-8">
      <div className="h-48 md:h-64 bg-cover bg-center rounded-lg shadow-lg" style={ { backgroundImage: `url(${ coverUrl })` } } />

      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 -mt-14">
        <div className="flex flex-col lg:flex-row items-center gap-x-6">
          <Avatar
            isBordered
            color="secondary"
            src={ avatarUrl }
            className="w-32 h-32 md:w-40 md:h-40 text-large bg-white dark:bg-slate-900 ring-4 ring-white dark:ring-slate-900"
          />
          <div className="mt-4 lg:mt-8 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 md:mt-5">{ username }</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1 max-w-xl">{ description }</p>
          </div>
        </div>

        <div className="flex items-center gap-x-6 mt-6 lg:mt-8 w-full lg:w-auto justify-center">
          <div className="text-center">
            <p className="font-bold text-xl">{ formatNumber( stats.posts ) }</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Publicaciones</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-xl">{ formatNumber( stats.followers ) }</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Seguidores</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-xl">{ formatNumber( stats.following ) }</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Siguiendo</p>
          </div>
          <Button className="hidden xl:flex" color="primary" startContent={ <IoPersonAddOutline size="18" /> }>
            Seguir
          </Button>
        </div>
      </div>
    </div>
  );
};