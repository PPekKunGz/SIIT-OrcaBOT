"use client";

import { Toaster, toast } from 'sonner'
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { useSession, signIn } from "next-auth/react";

export default function UnAuthSession() {
    const { data: session } = useSession();
    const [hasCookieConsent, setHasCookieConsent] = useState(false);

    useEffect(() => {
        const checkCookieConsent = () => {
            setHasCookieConsent(document.cookie.includes("cookieConsent=true"));
        };
        checkCookieConsent();
        const intervalId = setInterval(checkCookieConsent, 1000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (session?.user?.backend?.role === "USER") {
            window.location.href = "/apply";
        }
        if (session?.user?.backend?.role === "ADMIN") {
            window.location.href = "/dashboard";
        }
    }, [session]);

    const handleLoginClick = (e: React.MouseEvent) => {
        if (hasCookieConsent) {
            e.preventDefault();
            toast.error("Signin Closed");
        }
        // if (hasCookieConsent) {
        //     signIn('google');
        // }
    };

    return (
        <div className="flex items-center justify-center min-h-screen h-full">
            <Toaster position="top-right" richColors />
            <div className="h-fit">
                <div className="flex flex-col items-center justify-center gap-3 dark:bg-black/20 bg-zinc-600 border-b-4 text-white p-10 rounded-lg shadow-md">
                    <p className="font-bold text-3xl">You are not signed in!</p>
                    <p className="text-red-500 -translate-y-2">*Please use 6*********@g.siit.tu.ac.th</p>
                    <Button
                        onClick={handleLoginClick}
                        disabled={!hasCookieConsent}
                        className={`${!hasCookieConsent ? "cursor-not-allowed opacity-50" : ""}`}
                    >
                        <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Login with Google
                    </Button>
                    {!hasCookieConsent && (
                        <p className="translate-y-2">To continue using our services, please accept our cookies. You may need to refresh the page once after accepting!</p>
                    )}
                </div>
            </div>
        </div>
    );
}
