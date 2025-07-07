import type { Metadata } from "next";

interface PublicacionPageProps {
  params: Promise<{ slug: string; }>;
}

export async function generateMetadata(
  { params }: PublicacionPageProps
): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: slug,
    description: `Detalle de la publicación: ${ slug }`,
  };
}

export default async function PublicacionPage(
  { params }: PublicacionPageProps
) {
  const { slug } = await params;

  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">
        Publicación: { slug }
      </h1>
      <p className="mt-4 text-lg text-default-500">
        Esta es la página para la publicación{ " " }
        <span className="font-semibold text-primary">{ slug }</span>
      </p>
    </section>
  );
}