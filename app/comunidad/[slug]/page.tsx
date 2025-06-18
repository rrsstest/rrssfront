import { CommunityContainer } from '@/components';
import type { Metadata } from "next";

interface ComunidadPageProps {
  params: { slug: string; };
}

export async function generateMetadata( { params }: ComunidadPageProps ): Promise<Metadata> {
  return {
    title: params.slug,
    description: `Detalle de la comunidad: ${ params.slug }`,
  };
}

export default function ComunidadPage( { params }: ComunidadPageProps ) {
  const { slug } = params;

  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <CommunityContainer communitySlug={ slug } />
    </section>
  );
}