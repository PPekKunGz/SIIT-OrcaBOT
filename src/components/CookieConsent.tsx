"use client";

import { CookieIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function CookieConsent({ demo = false, onAcceptCallback = () => { }, onDeclineCallback = () => { } }) {
    const [isOpen, setIsOpen] = useState(false);
    const [hide, setHide] = useState(false);
    const [showPopupAgain, setShowPopupAgain] = useState(false);
    const [hasConsented, setHasConsented] = useState(false); 
    const [cookieStatus, setCookieStatus] = useState("");

    const checkCookieConsent = () => {
        const cookieConsent = document.cookie.split('; ').find(row => row.startsWith('cookieConsent='));
        if (cookieConsent) {
            const consentValue = cookieConsent.split('=')[1];
            if (consentValue === 'true' || consentValue === 'false') {
                setHasConsented(true);
                setCookieStatus(consentValue === 'true' ? "Accepted" : "Declined");
                if (!demo) {
                    setIsOpen(false);
                    setTimeout(() => {
                        setHide(true);
                        setShowPopupAgain(true);
                    }, 700);
                }
            }
        } else {
            setIsOpen(true);
        }
    };

    const accept = () => {
        document.cookie = "cookieConsent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
        setCookieStatus("Accepted");
        setHasConsented(true);
        setIsOpen(false);
        setTimeout(() => {
            setHide(true);
            setShowPopupAgain(true); 
        }, 700);
        onAcceptCallback();
    };

    const decline = () => {
        document.cookie = "cookieConsent=false; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
        setCookieStatus("Declined");
        setHasConsented(true);
        setIsOpen(false);
        setTimeout(() => {
            setHide(true);
            setShowPopupAgain(true); 
        }, 700);
        onDeclineCallback();
    };

    const showPopup = () => {
        setIsOpen(true);
        setHide(false);
        setShowPopupAgain(false);
    };

    useEffect(() => {
        checkCookieConsent(); 
    }, [demo]);

    useEffect(() => {
        if (hasConsented) {
            checkCookieConsent();
        }
    }, [hasConsented]);

    return (
        <>
            <div className={cn("fixed z-[200] bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md duration-700", !isOpen ? "transition-[opacity,transform] translate-y-8 opacity-0" : "transition-[opacity,transform] translate-y-0 opacity-100", hide && "hidden")}>
                <div className="dark:bg-secondary bg-background rounded-md m-3 border border-border shadow-lg dark:shadow-none">
                    <div className="grid gap-2">
                        <div className="border-b border-border dark:border-background/20 h-14 flex items-center justify-between p-4">
                            <h1 className="text-lg font-medium">We use cookies</h1>
                            <CookieIcon className="h-[1.2rem] w-[1.2rem]" />
                        </div>
                        <div className="p-4">
                            <p className="text-sm font-normal text-start">
                                To ensure optimal functionality of our site, it is necessary for cookies to be enabled. By continuing to use our website, you consent to our use of cookies.
                                <br />
                                <br />
                                <span className="text-xs">By clicking "<span className="font-medium opacity-80">Accept</span>", you agree to our use of cookies.</span>
                                <br />
                                <Link href="/privacy-policy" className="text-xs underline">Learn more.</Link>
                            </p>
                            {hasConsented && ( <p>Cookies Status: {cookieStatus}</p>
                            )}

                        </div>
                        <div className="flex gap-2 p-4 py-5 border-t border-border dark:bg-background/20">
                            <Button onClick={accept} className="w-full">Accept</Button>
                            <Button onClick={decline} className="w-full" variant="secondary">Decline</Button>
                        </div>
                    </div>
                </div>
            </div>
            {showPopupAgain && (
                <div className="fixed bottom-4 left-4 z-50">
                    <button
                        onClick={showPopup}
                        className="flex items-center justify-center bg-primary text-white rounded-full p-3 shadow-lg transition-colors hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                        <CookieIcon 
                            className="h-5 w-5 text-white dark:text-black" 
                        />
                    </button>
                </div>
            )}
        </>
    );
}
