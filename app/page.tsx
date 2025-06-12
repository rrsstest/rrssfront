import { GenericList, IUserItemList, StatusGalery } from '@/components';
import { PostContainer } from '@/components/posts';

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

export default function Home() {
  return (
    <section className="
      flex
      justify-center
      w-full
      min-h-screen
      pt-8
      pb-8
      gap-10
      xl:gap-16
      px-2
      bg-background
    ">
      <div className="hidden xl:flex flex-col justify-start items-end gap-8 flex-shrink-0 pt-6">
        <div className="w-[320px]">
          <GenericList
            title="Grupos"
            items={ grupos }
            selectionMode="none"
            hideIndicator
            cardClassName="w-full"
            icon="https://i.imgur.com/HRFutJ3.png"
          />
        </div>
        <div className="w-[320px]">
          <GenericList
            title="Grupos explorados"
            items={ grupos }
            selectionMode="none"
            hideIndicator
            cardClassName="w-full"
            icon="https://i.imgur.com/pDuOFX8.png"
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 w-full max-w-3xl mx-auto">
        <StatusGalery />
        <PostContainer />
        <PostContainer />
        <PostContainer />
        <PostContainer />
      </div>

      <div className="hidden xl:flex flex-col justify-start items-start pt-6 flex-shrink-0">
        <div className="w-[320px]">
          <GenericList
            title="Publicaciones"
            items={ publicaciones }
            selectionMode="none"
            hideIndicator
            cardClassName="w-full"
            icon="https://i.imgur.com/82GBaWF.png"
          />
        </div>
      </div>
    </section>
  );
}
