import type { Metadata } from "next";
import { UserProfile } from '@/components';

interface UserProfilePageProps {
  params: { username: string; };
}

export async function generateMetadata( { params }: UserProfilePageProps ): Promise<Metadata> {
  return {
    title: params.username,
    description: `Perfil de ${ params.username }`,
  };
}

export default function UserProfilePage( { params }: UserProfilePageProps ) {
  const { username } = params;

  return (
    <section className="w-full">
      <UserProfile username={ username } />
    </section>
  );
}