import { Post } from '../posts';
import { UserContent } from './UserContent';
import { UserCoverAndProfilePhotos } from './UserCoverAndProfilePhotos';

const mockUserPosts: Post[] = [
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

const mockUser = {
  username: 'Tony Reichert',
  description: 'Apasionado por el desarrollo frontend y el diseño de interfaces. Creando experiencias de usuario intuitivas y estéticas con React y Tailwind CSS.',
  avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  coverUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2940&auto=format&fit=crop',
  stats: {
    posts: mockUserPosts.length,
    followers: 12300,
    following: 450,
  },
  posts: mockUserPosts,
  photos: Array( 24 ).fill( null ),
  videos: Array( 3 ).fill( null ),
};

interface Props {
  username: string;
}

export const UserProfile = ( { username }: Props ) => {
  return (
    <div className="flex flex-col items-center w-full bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="w-full max-w-7xl px-4">
        <UserCoverAndProfilePhotos
          username={ mockUser.username }
          description={ mockUser.description }
          avatarUrl={ mockUser.avatarUrl }
          coverUrl={ mockUser.coverUrl }
          stats={ mockUser.stats }
        />
        <UserContent
          posts={ mockUser.posts }
          photos={ mockUser.photos }
          videos={ mockUser.videos }
        />
      </div>
    </div>
  );
};