import { NextResponse, NextRequest } from "next/server";
import { PrismaClient, EventType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

// Bloque de AuthOptions repetido para uso local
const authOptions: AuthOptions = {
  providers: [
    GoogleProvider( {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    } ),
  ],
  callbacks: {
    async jwt( { token, user } ) {
      if ( user ) {
        const dbUser = await prisma.user.findUnique( {
          where: { email: user.email! },
        } );
        if ( dbUser ) {
          token.id = dbUser.id;
          token.projectId = dbUser.projectId;
        }
      }
      return token;
    },
    async session( { session, token } ) {
      if ( session.user ) {
        session.user.id = token.id as string;
        session.user.projectId = token.projectId as string | null;
      }
      return session;
    },
  },
};

const getIp = ( request: NextRequest ) => {
  const headers = request.headers;
  const forwardedFor = headers.get( "x-forwarded-for" );
  if ( forwardedFor ) {
    return forwardedFor.split( "," )[ 0 ].trim();
  }
  const realIp = headers.get( "x-real-ip" );
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
      description: "Proyecto para agrupar usuarios y eventos anónimos basados en IP.",
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

export async function POST( request: NextRequest ) {
  try {
    const body = await request.json();
    const { path, durationSeconds, eventType } = body;
    const durationMs = Math.round( durationSeconds * 1000 );

    if ( durationMs <= 1000 ) {
      return NextResponse.json( { message: "Duración muy corta, no registrada." }, { status: 200 } );
    }

    const session = await getServerSession( authOptions );
    let userIdToLog: string;
    let projectIdToLog: string;
    let userType: "HUMAN" | "SYSTEM" = "HUMAN";

    if ( session?.user?.id && session.user.projectId ) {
      userIdToLog = session.user.id;
      projectIdToLog = session.user.projectId;
    } else {
      const ip = getIp( request );
      const visitor = await getVisitorUser( ip );
      userIdToLog = visitor.id;
      projectIdToLog = visitor.projectId;
      userType = "SYSTEM";
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

    return NextResponse.json( { success: true }, { status: 200 } );
  } catch ( error ) {
    console.error( "Error en /api/track:", error );
    return NextResponse.json( { success: false, error: "Internal Server Error" }, { status: 500 } );
  }
}