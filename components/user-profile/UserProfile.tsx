import { Post, PostContainer } from '../posts';
import { UserContent } from './UserContent';
import { UserCoverAndProfilePhotos } from './UserCoverAndProfilePhotos';

interface UserData {
  username: string;
  description: string;
  avatarUrl: string;
  coverUrl: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}

interface Props {
  userData: UserData;
}

const mockPosts: Post[] = [
  {
    id: 'post-1',
    author: { name: 'Tony Reichert', handle: 'tonyreichert', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    content: 'Descubriendo las posibilidades del diseño generativo con IA. ¡Los resultados son sorprendentes y abren un nuevo mundo de creatividad! #AI #Design',
    imageUrl: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2832&auto=format&fit=crop',
    stats: { likes: 124, comments: 18 },
  },
  {
    id: 'post-2',
    author: { name: 'Tony Reichert', handle: 'tonyreichert', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    content: 'Una buena taza de café y a organizar la semana. La clave está en la planificación y en tener objetivos claros. ¡Vamos a por ello!',
    imageUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2942&auto=format&fit=crop',
    stats: { likes: 350, comments: 45 },
  },
];

const mockPhotos = Array( 24 ).fill( null );
const mockVideos = Array( 3 ).fill( null );

export const UserProfile = ( { userData }: Props ) => {
  return (
    <div className="flex flex-col items-center w-full bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="w-full max-w-7xl px-4">
        <UserCoverAndProfilePhotos
          username={ userData.username }
          description={ userData.description }
          avatarUrl={ userData.avatarUrl }
          coverUrl={ userData.coverUrl }
          stats={ userData.stats }
        />
        <UserContent
          posts={ mockPosts }
          photos={ mockPhotos }
          videos={ mockVideos }
        />
      </div>
    </div>
  );
};