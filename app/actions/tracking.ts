"use server";

import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

interface LogViewEventPayload {
  path: string;
  durationSeconds: number;
}

export const logViewEvent = async ( payload: LogViewEventPayload ) => {
  const session = await getServerSession( authOptions );

  if ( !session?.user?.id || !session.user.projectId ) {
    return;
  }

  const { path, durationSeconds } = payload;
  const durationMs = Math.round( durationSeconds * 1000 );

  if ( durationMs <= 0 ) {
    return;
  }

  const endAt = new Date();
  const startAt = new Date( endAt.getTime() - durationMs );

  try {
    await prisma.event.create( {
      data: {
        type: "TRACK_VIEW",
        userId: session.user.id,
        createdById: session.user.id,
        projectId: session.user.projectId,
        targetModel: "VIEW",
        targetId: path,
        startAt: startAt,
        endAt: endAt,
        durationMs: durationMs,
        createdByType: "HUMAN",
      },
    } );
  } catch ( error ) {

  }
};