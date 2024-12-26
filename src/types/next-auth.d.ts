import { Role } from "@prisma/client"
import NextAuth, { DefaultSession } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            backend?: {
                id: int
                email: string
                name: string
                role: string,
                status: string,
                meetLink: string,
                datePicker: Date,
                userData?: {
                    lineID: string;
                    program: string;
                    academicYear: string;
                    degree: string;
                    campus: string;
                    clubRole: string;
                    whyJoinClub: string;
                    afterBetterClub: string;
                    portfolio: string;
                    interviewLocation: string;
                    phoneNumber: string;
                    createdAt: string
                    updatedAt: string
                } | null | undefined
                createdAt: string
                updatedAt: string
            } | null
            accessToken?: string | null
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        accessToken?: string | null
    }
}