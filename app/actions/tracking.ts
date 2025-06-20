"use server";

import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import { PrismaClient, EventType } from "@prisma/client";
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

interface LogViewEventPayload {
  path: string;
  durationSeconds: number;
  eventType: EventType;
}

const getIp = async () => {
  const headersList = await headers();
  const forwardedFor = headersList.get( "x-forwarded-for" );
  if ( forwardedFor ) {
    return forwardedFor.split( "," )[ 0 ].trim();
  }
  const vercelForwardedFor = headersList.get( "x-vercel-forwarded-for" );
  if ( vercelForwardedFor ) {
    return vercelForwardedFor.split( "," )[ 0 ].trim();
  }
  const realIp = headersList.get( "x-real-ip" );
  if ( realIp ) {
    return realIp.trim();
  }
  return "127.0.0.1";
};

const getVisitorUser = async ( ip: string ) => {
  const userSlug = `visitor-ip-${ ip.replace( /[.:]/g, "-" ) }`;
  const userEmail = `${ userSlug }@system.local`;

  const visitorsProject = await prisma.project.upsert( {
    where: { slug: "system-visitors-project" },
    update: {},
    create: {
      slug: "system-visitors-project",
      title: "Proyecto de Visitantes",
      description:
        "Proyecto para agrupar usuarios y eventos anónimos basados en IP.",
    },
  } );

  const visitorRole = await prisma.role.upsert( {
    where: {
      name_projectId: { name: "VISITOR", projectId: visitorsProject.id },
    },
    update: {},
    create: {
      name: "VISITOR",
      projectId: visitorsProject.id,
      createdByType: "SYSTEM",
    },
  } );

  const visitorUser = await prisma.user.upsert( {
    where: { slug: userSlug },
    update: { lastAccessed: new Date() },
    create: {
      slug: userSlug,
      email: userEmail,
      createdByType: "SYSTEM",
      project: { connect: { id: visitorsProject.id } },
      roles: { connect: { id: visitorRole.id } },
    },
  } );

  return {
    id: visitorUser.id,
    projectId: visitorUser.projectId!,
  };
};

export const logViewEvent = async ( payload: LogViewEventPayload ) => {
  try {
    const session = await getServerSession( authOptions );

    let userIdToLog: string;
    let projectIdToLog: string;
    let userType: "HUMAN" | "SYSTEM" = "HUMAN";

    if ( session?.user?.id && session.user.projectId ) {
      userIdToLog = session.user.id;
      projectIdToLog = session.user.projectId;
    } else {
      const ip = await getIp();
      const visitor = await getVisitorUser( ip );
      userIdToLog = visitor.id;
      projectIdToLog = visitor.projectId;
      userType = "SYSTEM";
    }

    const { path, durationSeconds, eventType } = payload;
    const durationMs = Math.round( durationSeconds * 1000 );

    if ( durationMs <= 1000 ) {
      return;
    }

    const endAt = new Date();
    const startAt = new Date( endAt.getTime() - durationMs );

    await prisma.event.create( {
      data: {
        type: eventType,
        userId: userIdToLog,
        createdById: userIdToLog,
        projectId: projectIdToLog,
        targetModel: "VIEW",
        targetId: path,
        startAt: startAt,
        endAt: endAt,
        durationMs: durationMs,
        createdByType: userType,
      },
    } );
  } catch ( error ) {
    console.error( "Error al guardar el evento de visualización:", error );
  }
};