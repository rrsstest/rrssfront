import { GenericList, IUserItemList } from '@/components';

const users: IUserItemList[] = [
  {
    key: 1,
    title: "Chung Miller",
    subtitle: "4 mensajes sin leer",
    avatarSrc: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    avatarColor: "primary",
    content: "Contenido adicional (opcional)",
  },
  {
    key: 2,
    title: "Janelle Lenard",
    subtitle: "3 pasos incompletos",
    avatarSrc: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    avatarColor: "success",
    content: "Otro contenido...",
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
  },
];

export default function Home() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-5 min-h-screen pb-4">
      <div className="order-1 md:order-none md:col-span-1 flex flex-col gap-y-8 items-start mt-12">
        <GenericList
          title="Grupos"
          items={ users }
          selectionMode="none"
          hideIndicator
          cardClassName="w-full max-w-xs"
        />
        <GenericList
          title="Grupos explorados"
          items={ users }
          selectionMode="none"
          hideIndicator
          cardClassName="w-full max-w-xs"
        />
      </div>
      <div className="order-3 md:order-none md:col-span-3 flex justify-center items-start">
        {/* Aquí podés poner el contenido principal */ }
      </div>
      <div className="order-2 md:order-none md:col-span-1 flex justify-center items-start mt-12">
        <GenericList
          title="Publicaciones"
          items={ users }
          selectionMode="none"
          hideIndicator
          cardClassName="w-full max-w-xs"
        />
      </div>
    </section>
  );
}
