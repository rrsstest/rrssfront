import type { Metadata } from "next";
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';

import { UserProfile } from '@/components';



const prisma = new PrismaClient();

interface UserProfilePageProps {
  params: { username: string; };
}

export async function generateMetadata( { params }: UserProfilePageProps ): Promise<Metadata> {
  
  const resolvedParams = await params;

  const user = await prisma.user.findUnique( {
    where: { slug: resolvedParams.username },
  } );

  if ( !user ) {
    return {
      title: "Usuario no encontrado",
    };
  }

  return {
    title: user.name || user.slug,
    description: user.publicDescription || `Perfil de ${ user.name || user.slug }`,
  };
}

export default async function UserProfilePage( { params }: UserProfilePageProps ) {
  const resolvedParams = await params;

  const user = await prisma.user.findUnique( {
    where: {
      slug: resolvedParams.username,
    },
    include: {
      profilePhotos: {
        where: { isCurrent: true },
        take: 1
      },
      _count: {
        select: {
          publications: true,
          followers: true,
          following: true,
        }
      }
    },
  } );

  if ( !user ) {
    redirect( '/' );
  }

  const userForProfile = {
    username: user.name || user.slug,
    description: user.publicDescription || 'Este usuario aún no ha añadido una descripción.',
    avatarUrl: user.profilePhotos[ 0 ]?.url || 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    coverUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2940&auto=format&fit=crop',
    stats: {
      posts: user._count.publications,
      followers: user._count.followers,
      following: user._count.following,
    },
  };

  return (
    <section className="w-full">
      <UserProfile userData={ userForProfile } />
    </section>
  );
}