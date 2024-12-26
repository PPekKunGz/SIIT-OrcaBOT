import { type AuthOptions, getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import * as JWT from 'jsonwebtoken'

export const authOptions: AuthOptions = {
    secret: process.env.AUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
        })
    ],
    callbacks: {
        async signIn({ profile }) {
            if(!profile?.email){
                return false
            }
            const accessToken = JWT.sign({ email: profile.email }, String(process.env.AUTH_SECRET))
            const respone = await fetch(`${process.env.apiUrl}/apis/v1/user/@me/create`, {
                method: 'POST',
                headers: {
                    dms_token: String(accessToken),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: profile.email,
                    name: profile.name
                })
            })
            const a = await respone.json()
            // console.log(a)
            if (respone.ok) {
            }
            return true
        },
        async jwt({ token }) {
            const accessToken = JWT.sign({ email: token.email }, String(process.env.AUTH_SECRET))
            return { ...token, accessToken }
        },
        async session({ session, token }) {
            session.user.accessToken = token.accessToken
            const respone = await fetch(`${process.env.apiUrl}/apis/v1/user/@me`, {
                method: 'GET',
                headers: {
                    dms_token: String(token.accessToken),
                    'Content-Type': 'application/json'
                }
            })
            if (respone.ok) {
                const data = await respone.json()
                if (data.code === 200) {
                    session.user.backend = data.data
                }
            }
            return session
        }
    }
}

export const getServerAuthSession = () => {
    getServerSession(authOptions)
}