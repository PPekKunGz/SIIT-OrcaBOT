"use client";

import { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";

export default function AuthProvider({ children }: { children: React.ReactNode }
){
    return(
        <SessionProvider refetchOnWindowFocus={false}>
            {children}
        </SessionProvider>
    )
}