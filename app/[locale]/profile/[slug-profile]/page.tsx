'use client';
import { useParams } from "next/navigation";

import { ProfileLayout, ProfileBody } from '@/components/profile';



export default function ProfilePage() {
  const params = useParams();

  const slug =
    typeof params[ "slug-profile" ] === "string"
      ? params[ "slug-profile" ]
      : Array.isArray( params[ "slug-profile" ] )
        ? params[ "slug-profile" ][ 0 ]
        : "";

  return (
    <ProfileLayout>
      <ProfileBody slug={ slug } />
    </ProfileLayout>
  );
}
