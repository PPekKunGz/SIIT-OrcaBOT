"use client"
import { useSession, signIn, signOut, SessionContextValue } from "next-auth/react";
import AuthSession from "../_components/assets/Dashboard";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function JoinEvent() {
    const session = useSession();
    const router = useRouter()

    if (session.data?.user.backend?.role != "ADMIN") {
        const msg = "%c Hey!! You're not ADMIN!"
        const styles = [
            'font-size: 12px',
            'font-family: monospace',
            'background: white',
            'display: inline-block',
            'color: black',
            'padding: 8px 19px',
            'border: 1px dashed;'
        ].join(';')
        console.log(msg, styles);
        router.push('/')
    }

    const [isLoading, setIsLoading] = useState(true);
    setTimeout(() => {
        setIsLoading(false);
    }, 2500);
    if (session.status === "authenticated" && session) {
        return (
            <>
                {isLoading ? (
                    <div className="flex items-center justify-center min-h-screen h-full -my-28">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 border-2 border-primary rounded-full animate-spin" />
                                <div className="w-4 h-4 border-2 border-primary rounded-full animate-spin delay-100" />
                                <div className="w-4 h-4 border-2 border-primary rounded-full animate-spin delay-200" />
                            </div>
                            <p className="text-muted-foreground md:text-3xl text-xl">Loading data...</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <AuthSession session={session} />
                    </>
                )}
            </>
        )
    } else if (session.status === "unauthenticated") {
        return (
            router.push("/auth")
        )
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