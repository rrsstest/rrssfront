"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="flex justify-center items-center h-screen">
      <button
        onClick={ () => signIn( "google" ) }
        className="px-6 py-3 bg-blue-600 text-white rounded"
      >
        Iniciar sesión con Google
      </button>
    </main>
  );
}
