'use client'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { signOut, useSession } from "next-auth/react"
import { SidebarMenu } from './sidebar';
import React, { useState } from "react";
import Link from 'next/link';
import { mainConfig } from '@/config/mainConfig';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { ThemeToggle } from '@/components/theme-toggle';
import { FaPowerOff } from 'react-icons/fa6';


interface SessionProps {
    session: any
}


const NavbarComponent: React.FC<SessionProps> = ({ }) => {
    const { setTheme, themes, resolvedTheme } = useTheme()
    const session = useSession();
    const drop = () => {
        setDropdown(!dropDown)
    }
    const [dropDown, setDropdown] = useState<boolean>(false);
    return (
        <header className="sticky top-0 z-50 flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white shadow-xl backdrop-blur-md border-b dark:bg-background dark:text-white text-sm py-4 dark:border-gray-600 border-white">
            <nav className="max-w-full w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                        <div className="sm:hidden">
                            <Sheet>
                                <SheetTrigger className='text-white mt-2'><Menu /></SheetTrigger>
                                <SheetContent side={"left"} className="w-[300px] sm:w-[340px]">
                                    <SheetHeader>
                                        <Link href="/" target="">
                                            <Image
                                                // src={resolvedTheme == "dark" ? mainConfig.logo.dark : mainConfig.logo.white}
                                                src={mainConfig.logo.white}
                                                alt="SIIT-Main-Logo"
                                                width={150}
                                                height={68}
                                                className="p-3"
                                                property=""
                                                draggable="false"
                                                priority
                                            />
                                        </Link>
                                        <SheetDescription>
                                            <SidebarMenu />
                                        </SheetDescription>
                                    </SheetHeader>
                                </SheetContent>
                            </Sheet>
                        </div>
                        <Link className="flex-none text-xl ml-4 font-semibold text-white" href="/">
                            <Image
                                // src={resolvedTheme == "dark" ? mainConfig.logo.dark : mainConfig.logo.white}
                                src={mainConfig.logo.white}
                                alt="SIIT-Main-Logo"
                                width={150}
                                height={68}
                                className="p-3"
                                property=""
                                draggable="false"
                                priority
                            />
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex dark:border-white/80 rounded-lg w-full">
                            <button onClick={() => drop()} className="outline-none flex flex-row gap-2 items-center justify-center py-2 w-full rounded-lg hover:bg-black/10 dark:hover:bg-white/10 duration-300">
                                <div>
                                    <img src={session.data?.user.image || ""} draggable="false" alt="" className="w-10 h-10 rounded-full" />
                                </div>
                                <div className="-space-y-2 flex flex-col">
                                    <div className="text-lg">{session.data?.user.name || ""}</div>
                                    <div className="text-xs">{session.data?.user.email || ""}</div>
                                </div>
                                {
                                    dropDown && (
                                        <div className="absolute translate-x-5 translate-y-12 flex flex-col w-full items-center">
                                            <button onClick={() => signOut()} className="hover:scale-105 duration-300">
                                                <div className="flex items-center gap-1 w-fit p-2 rounded-md bg-black/20">
                                                    <FaPowerOff color="red" />
                                                    <span className="font-bold text-[12px]">Logout</span>
                                                </div>
                                            </button>
                                        </div>
                                    )
                                }
                            </button>
                        </div>
                        <div>
                            <ThemeToggle />
                        </div>
                        <div className="flex flex-row lg:hidden justify-center w-full h-fit py-2 gap-2">
                            {/* <ThemeToggle /> */}
                            <div>
                                <button onClick={() => drop()} className="bg-black/20 p-2 rounded-lg hover:scale-110 active:scale-90 duration-300">
                                    <img src={session.data?.user.image || ""} draggable="false" alt="" className="w-10 h-10 rounded-full" />
                                    {
                                        dropDown && (
                                            <div className="absolute -my-9 -translate-x-20 flex flex-col w-full items-center">
                                                <button onClick={() => signOut()} className="hover:scale-105 duration-300">
                                                    <span className="flex items-center gap-1 w-fit p-2 rounded-md bg-black/50">

                                                        <span className="font-bold text-[12px]">Logout</span>
                                                    </span>
                                                </button>
                                            </div>
                                        )
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
export default NavbarComponent;