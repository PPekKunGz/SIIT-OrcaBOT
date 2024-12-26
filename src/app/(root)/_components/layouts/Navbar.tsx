"use client"
import { mainConfig } from "../../../../config/mainConfig";
import { ThemeToggle } from "@/components/theme-toggle";
import { navConfig } from "@/config/navLink";
import { useTheme } from 'next-themes'
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    const { setTheme, themes, resolvedTheme } = useTheme()
    return (
        <>
            <header className="text-white text-center">
                <nav className="w-full p-2h-fit shadow-xl backdrop-blur-md z-50 border-b">

                    <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-evenly px-3 h-full">
                        <div className="">
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
                        </div>
                        <div className="flex dark:text-white text-black items-center space-x-4 lg:space-x-6 p-2 md:p-0">
                            <Link
                                href={navConfig.links.home}
                                className='text-sm font-bold inline-block relative hover:text-primary after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 after:ease-in-out hover:after:w-full'
                            >
                                {navConfig.name.home}
                            </Link>
                            <Link
                                href={navConfig.links.about}
                                className='text-sm font-bold inline-block relative hover:text-primary after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 after:ease-in-out hover:after:w-full'
                            >
                                {navConfig.name.about}
                            </Link>
                            <Link
                                href={navConfig.links.blog}
                                className='text-sm font-bold inline-block relative hover:text-primary after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 after:ease-in-out hover:after:w-full'
                            >
                                {navConfig.name.blog}
                            </Link>
                            <Link
                                href={navConfig.links.contact}
                                className='text-sm font-bold inline-block relative hover:text-primary after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 after:ease-in-out hover:after:w-full'
                            >
                                {navConfig.name.contact}
                            </Link>
                            <ThemeToggle />
                        </div>
                    </div>

                </nav>
            </header>
        </>
    )
}