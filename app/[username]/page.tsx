import type { Metadata } from "next";

interface Props {
  params: { username: string; };
}

export async function generateMetadata( { params }: Props ): Promise<Metadata> {
  return {
    title: params.username,
    description: `Perfil de ${ params.username }`,
  };
}

export default function UserProfilePage( { params }: Props ) {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">
        Perfil de { params.username }
      </h1>
      <p className="mt-4 text-lg text-default-500">
        Esta es la página de usuario para <span className="font-semibold text-primary">{ params.username }</span>
      </p>
    </section>
  );
}
