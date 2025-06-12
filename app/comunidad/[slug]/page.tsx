import { CommunityContainer } from '@/components';
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

  const { slug } = await params;

  return (
    <section className="flex flex-col items-center justify-center min-h-screen">

      <CommunityContainer communitySlug={ slug } />

    </section>
  );
}
