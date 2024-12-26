"use client"
import { useSession, signIn, signOut, SessionContextValue } from "next-auth/react"
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/_utils";
import UnAuthSession from "../../(root)/_components/layouts/session/unauth";
import AuthSession from "../../(root)/_components/layouts/session/auth";
import { useEffect, useState } from 'react';
import UserAuth from "@/app/(root)/auth/page";
import { useRouter } from "next/navigation";

export default function JoinEvent() {
    // const session = getServerAuthSession()

    const session = useSession();
    const router = useRouter();

    if (session.status === "authenticated" && session) {
        return (
            <AuthSession session={session} />
        )
    } else if (session.status === "unauthenticated") {
        window.location.href = "/auth"
        // return (
        //     <UnAuthSession/>
        // )
    } else {
        return (
            <div className="flex items-center justify-center min-h-screen h-full">
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-primary rounded-full animate-spin" />
                        <div className="w-4 h-4 border-2 border-primary rounded-full animate-spin delay-100" />
                        <div className="w-4 h-4 border-2 border-primary rounded-full animate-spin delay-200" />
                    </div>
                    <p className="text-muted-foreground">Loading data...</p>
                </div>
            </div>
        )
    }

}