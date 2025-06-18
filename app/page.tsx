import { GenericList, IUserItemList, StatusGallery } from '@/components';
import { GroupsIcon, PublicationsIcon } from '@/components/icons';
import { Post, PostContainer } from '@/components/posts';

const grupos: IUserItemList[] = [
  {
    key: 1,
    title: "Chung Miller",
    subtitle: "4 mensajes sin leer",
    avatarSrc: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    avatarColor: "primary",
    content: "Contenido adicional (opcional)",
    href: "/comunidad/comunidad-1"
  },
  {
    key: 2,
    title: "Janelle Lenard",
    subtitle: "3 pasos incompletos",
    avatarSrc: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    avatarColor: "success",
    content: "Otro contenido...",
    href: "/comunidad/comunidad-2"
  },
  {
    key: 3,
    title: "Zoey Lang",
    subtitle: (
      <p className="flex">
        2 problemas por<span className="text-primary ml-1">resolver ahora</span>
      </p>
    ),
    avatarSrc: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    avatarColor: "warning",
    content: "Detalles extra para Zoey",
    href: "/comunidad/comunidad-3"
  },
];

const publicaciones: IUserItemList[] = [
  {
    key: 1,
    title: "Chung Miller",
    subtitle: "4 mensajes sin leer",
    avatarSrc: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    avatarColor: "primary",
    content: "Contenido adicional (opcional)",
    href: "/publicacion/publicacion-1"
  },
  {
    key: 2,
    title: "Janelle Lenard",
    subtitle: "3 pasos incompletos",
    avatarSrc: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    avatarColor: "success",
    content: "Otro contenido...",
    href: "/publicacion/publicacion-2"
  },
  {
    key: 3,
    title: "Zoey Lang",
    subtitle: (
      <p className="flex">
        2 problemas por<span className="text-primary ml-1">resolver ahora</span>
      </p>
    ),
    avatarSrc: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    avatarColor: "warning",
    content: "Detalles extra para Zoey",
    href: "/publicacion/publicacion-3"
  },
];

const mockPosts: Post[] = [
  {
    id: 'post-1',
    author: { name: 'Elena Rodriguez', handle: 'elenadev', avatarUrl: 'https://i.pravatar.cc/150?u=elena' },
    content: 'Acabo de terminar un nuevo componente de UI en React y Svelte. Es increíble ver las diferencias y similitudes entre ambos frameworks. #webdev #reactjs #svelte',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14694dd?q=80&w=2070&auto=format&fit=crop',
    stats: { likes: 188, comments: 23 },
  },
  {
    id: 'post-2',
    author: { name: 'Marco Diaz', handle: 'marcod', avatarUrl: 'https://i.pravatar.cc/150?u=marco' },
    content: 'El diseño no es solo cómo se ve, sino cómo funciona. Una buena UX puede ser la diferencia entre un producto exitoso y uno que nadie usa.',
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop',
    stats: { likes: 345, comments: 51 },
  },
  {
    id: 'post-3',
    author: { name: 'Sofia Chen', handle: 'sofiac', avatarUrl: 'https://i.pravatar.cc/150?u=sofia' },
    content: 'Explorando las nuevas APIs de CSS. ¡El potencial para crear layouts complejos con menos código es asombroso!',
    imageUrl: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop',
    stats: { likes: 231, comments: 19 },
  },
  {
    id: 'post-4',
    author: { name: 'Leo Martinez', handle: 'leom', avatarUrl: 'https://i.pravatar.cc/150?u=leo' },
    content: 'Una mañana productiva de código, acompañada de un buen café. No hay mejor sensación.',
    imageUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2070&auto=format&fit=crop',
    stats: { likes: 520, comments: 88 },
  },
];

export default function Home() {
  return (
    <section
      className="
        flex
        justify-center
        min-h-screen
        pt-8
        pb-8
        gap-10
        xl:gap-16
        max-w-7xl
        mx-auto
        w-full
        px-4
        sm:px-6
        lg:px-8
      "
    >
      <div className="hidden xl:flex flex-col justify-start items-end gap-8 flex-shrink-0 pt-6">
        <div className="w-[320px]">
          <GenericList
            title="Grupos"
            items={ grupos }
            selectionMode="none"
            hideIndicator
            cardClassName="w-full"
            icon={ <GroupsIcon /> }
          />
        </div>
        <div className="w-[320px]">
          <GenericList
            title="Comunidad"
            items={ grupos }
            selectionMode="none"
            hideIndicator
            cardClassName="w-full"
            icon={ <GroupsIcon /> }
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 w-full max-w-3xl mx-auto">
        <StatusGallery />
        { mockPosts.map( ( post ) => (
          <PostContainer key={ post.id } post={ post } />
        ) ) }
      </div>

      <div className="hidden xl:flex flex-col justify-start items-start pt-6 flex-shrink-0">
        <div className="w-[320px]">
          <GenericList
            title="Publicaciones"
            items={ publicaciones }
            selectionMode="none"
            hideIndicator
            cardClassName="w-full"
            icon={ <PublicationsIcon /> }
          />
        </div>
      </div>
    </section>
  );
}