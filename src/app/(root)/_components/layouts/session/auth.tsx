"use client"

import { SessionContextValue } from "next-auth/react";
import React from "react";
import { FaPowerOff } from "react-icons/fa6";
import { signOut } from "next-auth/react"
import PersonalPage from '../../assets/authencation/Personal'
import { FaBook, FaAddressCard, FaBars, FaCircle, FaMapMarkedAlt } from "react-icons/fa";
import { SiGooglemeet, SiMarketo } from "react-icons/si";
import Status from "../../assets/authencation/Status";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


interface SessionProps {
    session: SessionContextValue<boolean>
}

const AuthSession: React.FC<SessionProps> = ({ session }) => {
    const [position, setPosition] = React.useState("bottom")

    if (!session.data || !session.data.user || !session.data.user.backend) {
        return (<div></div>)
    }

    const emailToStudent = (a: string | null | undefined) => {
        if (a == undefined || a == null) return ""
        return a.split("@")[0]
    }

    const drop = () => {
        // if (dropDown == 0) {
        //     setDropdown(1)
        //     return;
        // } else if (dropDown == 1) {
        //     setDropdown(0)
        // }
        setDropdown(!dropDown)
    }

    const [selectPage, setSelectPage] = useState<string>("personal")
    const [dropDown, setDropdown] = useState<boolean>(false);
    const router = useRouter();
    const [hasCookieConsent, setHasCookieConsent] = useState(false);

    useEffect(() => {
        const checkCookieConsent = () => {
            setHasCookieConsent(document.cookie.includes("cookieConsent=true"));
        };
        checkCookieConsent();
        const intervalId = setInterval(checkCookieConsent, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="min-h-screen h-full w-screen mt-44 sm:mt-24">
            {hasCookieConsent ? (
                <div className="relative flex flex-col lg:flex-row">
                    {/* Mobile view */}
                    <div className="flex flex-row lg:hidden justify-center w-full h-fit py-2 gap-2">
                        <button
                            onClick={() => drop()}
                            className="bg-black/20 p-2 rounded-lg hover:scale-110 active:scale-90 transition-all duration-300"
                        >
                            <img
                                src={session.data.user.image || ""}
                                draggable="false"
                                alt=""
                                className="w-10 h-10 rounded-full"
                            />
                            {dropDown && (
                                <div className="absolute -my-9 -translate-x-20 flex flex-col w-full items-center">
                                    <button
                                        onClick={() =>
                                            signOut({ redirect: false }).then(() => {
                                                router.push("/");
                                            })
                                        }
                                        className="hover:scale-105 duration-300"
                                    >
                                        <div className="flex items-center gap-1 w-fit p-2 rounded-md bg-black/20">
                                            <FaPowerOff color="red" />
                                            <p className="font-bold text-[12px]">Logout</p>
                                        </div>
                                    </button>
                                </div>
                            )}
                        </button>
                        <button
                            onClick={() => setSelectPage("personal")}
                            disabled={selectPage === "personal"}
                            className="bg-black/20 p-2 rounded-lg hover:scale-110 active:scale-90 duration-300"
                        >
                            <FaAddressCard size={30} />
                        </button>
                        <button
                            onClick={() => setSelectPage("status")}
                            disabled={selectPage === "status"}
                            className="bg-black/20 p-2 rounded-lg hover:scale-110 active:scale-90 duration-300"
                        >
                            <FaBars size={30} />
                        </button>
                    </div>
    
                    {/* Desktop view */}
                    <div className="relative flex justify-center w-full min-h-screen h-full mt-4 mb-4">
                        <div className="hidden lg:block min-w-[420px] h-screen px-10 pt-4">
                            <div className="flex flex-col w-full h-fit gap-2">
                                <div className="border border-black/80 dark:border-white/80 rounded-lg w-full">
                                    <button
                                        onClick={() => drop()}
                                        className="outline-none flex flex-row gap-2 items-center justify-center py-2 w-full rounded-lg hover:bg-black/10 dark:hover:bg-white/10 duration-300"
                                    >
                                        <div>
                                            <img
                                                src={session.data.user.image || ""}
                                                draggable="false"
                                                alt=""
                                                className="w-10 h-10 rounded-full"
                                            />
                                        </div>
                                        <div className="-space-y-2 flex flex-col">
                                            <p className="text-lg">{session.data.user.name || ""}</p>
                                            <p className="text-xs">{session.data.user.email || ""}</p>
                                        </div>
                                    </button>
    
                                    {dropDown && (
                                        <div className="flex flex-col w-full items-center">
                                            <button
                                                onClick={() =>
                                                    signOut({ redirect: false }).then(() => {
                                                        router.push("/");
                                                    })
                                                }
                                                className="outline-none flex flex-row gap-2 items-center justify-center py-2 w-full rounded-lg hover:bg-black/10 dark:hover:bg-white/50 duration-300"
                                            >
                                                <FaPowerOff />
                                                <p>Logout</p>
                                            </button>
                                        </div>
                                    )}
                                </div>
    
                                <button
                                    disabled={selectPage === "personal"}
                                    onClick={() => setSelectPage("personal")}
                                    className="gap-1 outline-none flex items-center justify-center flex-row py-3 rounded-lg border w-full duration-300 border-black/80 dark:border-white/80 disabled:bg-black/80 disabled:text-white dark:disabled:bg-white/20 hover:bg-black/10 dark:hover:bg-white/10 active:scale-90 disabled:active:scale-100"
                                >
                                    <FaAddressCard size={30} className="-translate-x-3" />
                                    <p className="text-lg -translate-x-3">Registration Form</p>
                                </button>
    
                                <button
                                    disabled={selectPage === "status"}
                                    onClick={() => setSelectPage("status")}
                                    className="gap-1 outline-none flex items-center justify-center flex-row py-3 rounded-lg border w-full duration-300 border-black/80 dark:border-white/80 disabled:bg-black/80 disabled:text-white dark:disabled:bg-white/20 hover:bg-black/10 dark:hover:bg-white/10 active:scale-90 disabled:active:scale-100"
                                >
                                    <FaBars size={30} />
                                    <p className="text-lg">Registration Status</p>
                                    {session.data.user.backend.status === "NOT_REGISTER" && (
                                        <FaCircle size={10} color="gray" className="-translate-y-2 -translate-x-1" />
                                    )}
                                    {session.data.user.backend.status === "REJECT" && (
                                        <FaCircle size={10} color="red" className="-translate-y-2 -translate-x-1" />
                                    )}
                                    {session.data.user.backend.status === "WAITING" && (
                                        <FaCircle size={10} color="orange" className="-translate-y-2 -translate-x-1" />
                                    )}
                                    {session.data.user.backend.status === "SUCCESS" && (
                                        <FaCircle size={10} color="lime" className="-translate-y-2 -translate-x-1" />
                                    )}
                                    {session.data.user.backend.status === "PASS" && (
                                        <FaCircle size={10} color="ca98ff" className="-translate-y-2 -translate-x-1" />
                                    )}
                                    {session.data.user.backend.status === "NOT_PASS" && (
                                        <FaCircle size={10} color="ff9090" className="-translate-y-2 -translate-x-1" />
                                    )}
                                </button>
                            </div>
                        </div>
                        {selectPage === "personal" && <PersonalPage session={session} />}
                        {selectPage === "status" && <Status session={session} />}
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center min-h-screen h-full">
            <div className="h-fit">
                <div className="flex flex-col items-center justify-center gap-3 dark:bg-black/20 bg-zinc-600 border-b-4 text-white p-10 rounded-lg shadow-md">
                        <p className="translate-y-2">Please accept cookies to proceed. You may need to refresh the page once after accepting!</p>
                </div>
            </div>
        </div>
            )}
        </div>
    );
    
}

export default AuthSession;