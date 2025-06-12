import type { Metadata } from "next";

interface Props {
  params: { slug: string; };
}

export async function generateMetadata( { params }: Props ): Promise<Metadata> {
  return {
    title: params.slug,
    description: `Detalle de la publicación: ${ params.slug }`,
  };
}

export default function PublicacionPage( { params }: Props ) {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">
        Publicación: { params.slug }
      </h1>
      <p className="mt-4 text-lg text-default-500">
        Esta es la página para la publicación <span className="font-semibold text-primary">{ params.slug }</span>
      </p>
    </section>
  );
}
