import type { Metadata } from "next";

import { UserProfile } from '@/components';



interface Props {
  params: { username: string; };
}

export async function generateMetadata( { params }: Props ): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: resolvedParams.username,
    description: `Perfil de ${ resolvedParams.username }`,
  };
}


export default async function UserProfilePage( { params }: Props ) {

  const resolvedParams = await params;
  const { username } = resolvedParams;

  return (
    <section className="w-full">

      <UserProfile username={ username } />

      
    </section>
  );
}