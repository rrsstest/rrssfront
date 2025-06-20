import { CommunityContainer } from '@/components';
import type { Metadata } from "next";

interface ComunidadPageProps {
  params: { slug: string; };
}

export async function generateMetadata( { params }: ComunidadPageProps ): Promise<Metadata> {
  const resolvedParams = await params;

  return {
    title: resolvedParams.slug,
    description: `Detalle de la comunidad: ${ resolvedParams.slug }`,
  };
}

export default async function ComunidadPage( { params }: ComunidadPageProps ) {
  const { slug } = await params;

  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <CommunityContainer communitySlug={ slug } />
    </section>
  );
}