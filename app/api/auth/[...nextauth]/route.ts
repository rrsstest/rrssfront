import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

const handler = NextAuth( {
  providers: [
    GoogleProvider( {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    } ),
  ],
  callbacks: {
    async signIn( { user } ) {
      if ( !user.email ) return false;

      const googlePhoto = user.image || null;

      const existingUser = await prisma.user.findUnique( {
        where: { email: user.email },
        include: {
          roles: true,
          profilePhotos: { where: { isCurrent: true } },
        },
      } );

      if ( existingUser ) {
        if ( !existingUser.status ) {
          return false;
        }

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

        await prisma.user.update( {
          where: { id: existingUser.id },
          data: {
            lastAccessed: new Date(),
            updatedAt: new Date(),
          },
        } );

        await prisma.event.create( {
          data: {
            user: { connect: { id: existingUser.id } },
            type: "LOGIN",
            createdByType: "HUMAN",
            createdBy: { connect: { id: existingUser.id } },
          },
        } );

        return true;
      }

      let userRole = await prisma.role.findUnique( { where: { name: "USER" } } );
      
      if ( !userRole ) {
        userRole = await prisma.role.create( { data: { name: "USER" } } );
      }

      const newUser = await prisma.user.create( {
        data: {
          slug: user.email.replace( /[@.]/g, "-" ) + "-" + Math.random().toString( 36 ).substring( 2, 8 ),
          email: user.email,
          status: true,
          roles: { connect: { id: userRole.id } },
          createdByType: "HUMAN",
          lastAccessed: new Date(),
        },
      } );

      if ( googlePhoto ) {
        await prisma.profilePhoto.create( {
          data: {
            url: googlePhoto,
            isCurrent: true,
            user: { connect: { id: newUser.id } },
            createdBy: { connect: { id: newUser.id } },
          },
        } );
      }

      await prisma.event.create( {
        data: {
          user: { connect: { id: newUser.id } },
          type: "LOGIN",
          createdByType: "HUMAN",
          createdBy: { connect: { id: newUser.id } },
        },
      } );

      return true;
    },
  },
} );

export { handler as GET, handler as POST };