"use client";

import { AuthGate } from "../auth";

export const MyProfileLayout = ( { children }: { children?: React.ReactNode; } ) => {
  return (
    <AuthGate>
      <div className="admin-layout min-h-screen">
        { children }
      </div>
    </AuthGate>
  );
};
