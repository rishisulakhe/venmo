import db from "@repo/db"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          // TODO: User credentials type from next-aut
          async authorize(credentials: any) {
            // Do zod validation, OTP validation here
            if (!credentials?.phone || !credentials?.password) {
                throw new Error("Phone number and password are required");
              }
           
            const existingUser = await db.user.findFirst({
                where: {
                    number: credentials.phone
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        number: existingUser.number
                    }
                }
                return null;
            }

            try {
                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                const user = await db.user.create({
                    data: {
                        number: credentials.phone,
                        password: hashedPassword
                    }
                });
                //send an otp to user phone number
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.number
                }
            } catch (error) {
                console.error("Signup error:", error);
                throw new Error("Error creating user");
              }
          },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
  }
  