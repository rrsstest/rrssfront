'use client';
import { useParams } from "next/navigation";

export default function MyProfilePage() {
  const params = useParams();
  const slug = params[ "slug-profile" ];

  return (
    <div className="text-2xl text-center font-bold text-blue-500 mt-10">
      Este es el perfil: { slug }
    </div>
  );
}
