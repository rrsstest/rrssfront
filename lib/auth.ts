import { PrismaClient } from "@prisma/client";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
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
    async signIn( { user } ) {
      if ( !user.email ) return false;

      console.log( "Datos recibidos del proveedor de Google:", user );

      const googlePhoto = user.image || null;
      const googleName = user.name || user.email;

      const existingUser = await prisma.user.findUnique( {
        where: { email: user.email },
        include: {
          roles: true,
          profilePhotos: { where: { isCurrent: true } },
          project: true,
        },
      } );

      if ( existingUser ) {
        if ( !existingUser.status ) {
          return false;
        }

        await prisma.user.update( {
          where: { id: existingUser.id },
          data: {
            name: googleName,
            lastAccessed: new Date(),
            updatedAt: new Date(),
          },
        } );

        if ( googlePhoto && existingUser.profilePhotos.length > 0 ) {
          await prisma.profilePhoto.updateMany( {
            where: { userId: existingUser.id, isCurrent: true },
            data: { url: googlePhoto },
          } );
        } else if ( googlePhoto && existingUser.profilePhotos.length === 0 ) {
          await prisma.profilePhoto.create( {
            data: {
              url: googlePhoto,
              isCurrent: true,
              user: { connect: { id: existingUser.id } },
              createdBy: { connect: { id: existingUser.id } },
            },
          } );
        }

        if ( existingUser.projectId ) {
          await prisma.event.create( {
            data: {
              userId: existingUser.id,
              type: "LOGIN",
              createdByType: "HUMAN",
              createdById: existingUser.id,
              projectId: existingUser.projectId,
            },
          } );
        }

        return true;
      }

      try {
        await prisma.$transaction( async ( tx ) => {
          const newUser = await tx.user.create( {
            data: {
              name: googleName,
              slug:
                user.email!.replace( /[@.]/g, "-" ) +
                "-" +
                Math.random().toString( 36 ).substring( 2, 8 ),
              email: user.email,
              status: true,
              createdByType: "HUMAN",
              lastAccessed: new Date(),
            },
          } );

          const newProject = await tx.project.create( {
            data: {
              title: "proyecto nuevo",
              description: "proyecto nuevo",
              slug: "proyecto-nuevo-" + newUser.id.substring( 0, 8 ),
              createdBy: { connect: { id: newUser.id } },
            },
          } );

          let userRole = await tx.role.findFirst( {
            where: {
              name: "USER",
              projectId: newProject.id,
            },
          } );

          if ( !userRole ) {
            userRole = await tx.role.create( {
              data: {
                name: "USER",
                projectId: newProject.id,
                createdById: newUser.id,
              },
            } );
          }

          await tx.user.update( {
            where: { id: newUser.id },
            data: {
              project: { connect: { id: newProject.id } },
              roles: { connect: { id: userRole.id } },
              createdBy: { connect: { id: newUser.id } },
            },
          } );

          if ( googlePhoto ) {
            await tx.profilePhoto.create( {
              data: {
                url: googlePhoto,
                isCurrent: true,
                user: { connect: { id: newUser.id } },
                createdBy: { connect: { id: newUser.id } },
              },
            } );
          }

          await tx.event.create( {
            data: {
              userId: newUser.id,
              type: "LOGIN",
              createdByType: "HUMAN",
              createdById: newUser.id,
              projectId: newProject.id,
            },
          } );

          await tx.event.create( {
            data: {
              userId: newUser.id,
              type: "CREATE_PROJECT",
              createdByType: "HUMAN",
              createdById: newUser.id,
              projectId: newProject.id,
              targetModel: "Project",
              targetId: newProject.id,
              metadata: { action: "Initial project created for new user" },
            },
          } );

          await tx.event.create( {
            data: {
              userId: newUser.id,
              type: "CREATE_USER",
              createdByType: "HUMAN",
              createdById: newUser.id,
              projectId: newProject.id,
              targetModel: "User",
              targetId: newUser.id,
              metadata: { action: "New user account created" },
            },
          } );
        } );

        return true;
      } catch {
        return false;
      }
    },
  },
  events: {
    async signOut( message ) {
      const userEmail = message.token?.email;

      if ( userEmail ) {
        try {
          const user = await prisma.user.findUnique( {
            where: { email: userEmail },
          } );

          if ( user && user.projectId ) {
            await prisma.event.create( {
              data: {
                user: { connect: { id: user.id } },
                type: "LOGOUT",
                createdByType: "HUMAN",
                createdBy: { connect: { id: user.id } },
                project: { connect: { id: user.projectId } },
              },
            } );
          }
        } catch { }
      }
    },
  },
};