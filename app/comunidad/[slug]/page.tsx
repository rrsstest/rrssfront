import type { Metadata } from "next";

interface Props {
  params: { slug: string; };
}

export async function generateMetadata( { params }: Props ): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: resolvedParams.slug,
    description: `Detalle de la comunidad: ${ resolvedParams.slug }`,
  };
}

export default async function ComunidadPage( { params }: Props ) {

  const resolvedParams = await params;

  return (
    <section className="flex flex-col items-center justify-center min-h-screen">

      <h1 className="text-3xl font-bold">
        Comunidad : { resolvedParams.slug }
      </h1>

      <p className="mt-4 text-lg text-default-500">
        Esta es la página para la comunidad{ " " }
        <span className="font-semibold text-primary">{ resolvedParams.slug }</span>
      </p>
      
    </section>
  );
}
