"use client"
import { Toaster, toast } from 'sonner'
import { mainConfig } from "../../../../config/mainConfig";
import SponserSIIT from "@/components/siit-sponser";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Index() {
    const [isApplyDisabled, setIsApplyDisabled] = useState<boolean>(true); //true = disable, false = enable

    const handleJoinUsClick = (e: React.MouseEvent) => {
        if (isApplyDisabled) {
            e.preventDefault();
            toast.error("/apply ปิดไม่ให้ใช้งาน");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-background dark:text-white">
            <Toaster position="top-right" richColors />
            <div className="">
                <Image
                    src={mainConfig.robocup.logo}
                    width={0}
                    height={0}
                    alt="SIIT Main Logo"
                    className="w-80"
                    draggable="false"
                    priority />
            </div>
            <h1 className="text-4xl font-bold">{mainConfig.robocup.line1}</h1>
            <h2 className="text-4xl font-bold">{mainConfig.robocup.line2}</h2>
            <p className="mt-4 text-lg">{mainConfig.robocup.description}</p>
            <div className="flex items-center justify-center mt-6 space-x-4 -translate-y-4">
                <Link href={{ pathname: "/about" }}>
                    <Button variant="default" className="">About</Button>
                </Link>
                <Link href={{ pathname: "/blog" }}>
                    <Button variant="default" className="">Blog</Button>
                </Link>
                <Link href={{ pathname: "/contact" }}>
                    <Button variant="default" className="">Contact</Button>
                </Link>
            </div>
            <div className="flex items-center justify-center -translate-x-1">
                <Link href={{ pathname: "/apply" }} className="mb-8" onClick={handleJoinUsClick}>
                    <Button variant="destructive" className="" disabled={isApplyDisabled}>
                        Join Us
                    </Button>
                </Link>
            </div>
            <SponserSIIT />
        </div>
    );
}
