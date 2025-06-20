import type { Metadata } from "next";

interface PublicacionPageProps {
  params: { slug: string; };
}

export async function generateMetadata( { params }: PublicacionPageProps ): Promise<Metadata> {
  const resolvedParams = await params;

  return {
    title: resolvedParams.slug,
    description: `Detalle de la publicación: ${ resolvedParams.slug }`,
  };
}

export default async function PublicacionPage( { params }: PublicacionPageProps ) {
  const resolvedParams = await params;

  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">
        Publicación: { resolvedParams.slug }
      </h1>
      <p className="mt-4 text-lg text-default-500">
        Esta es la página para la publicación{ " " }
        <span className="font-semibold text-primary">{ resolvedParams.slug }</span>
      </p>
    </section>
  );
}