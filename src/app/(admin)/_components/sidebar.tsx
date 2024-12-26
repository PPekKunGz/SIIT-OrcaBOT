import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, Menu, Play, House, User, BookMarked, EarthIcon, Contact, ShieldCheck } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import settingConfig from "../../../config/settingConfig";

type Menu = {
    label: string
    name: string
    icon: React.ReactNode
    submenu?: Submenu[]
    href: string
}

type Submenu = {
    name: string
    icon: React.ReactNode
    href: string
}

export function SidebarMenu() {
    const menus: Menu[] = [
        {
            label: "Dashboard Panel",
            name: "Statistics",
            icon: <ShieldCheck size={15} className="mr-2" />,
            href: "/dashboard",
        },
        {
            label: "Dashboard Panel",
            name: "Applicants",
            icon: <Contact size={15} className="mr-2" />,
            href: "/dashboard/register",
        },
        {
            label: (settingConfig.settings.label),
            name: (settingConfig.settings.config.home.title),
            icon: <House size={15} className="mr-2" />,
            href: (settingConfig.settings.config.home.path),
        },
        {
            label: (settingConfig.settings.label),
            name: (settingConfig.settings.config.about.title),
            icon: <User size={15} className="mr-2" />,
            href: (settingConfig.settings.config.about.path),
        },
        {
            label: (settingConfig.settings.label),
            name: (settingConfig.settings.config.blog.title),
            icon: <BookMarked size={15} className="mr-2" />,
            href: (settingConfig.settings.config.blog.path),
        },
        {
            label: (settingConfig.settings.label),
            name: (settingConfig.settings.config.contact.title),
            icon: <EarthIcon size={15} className="mr-2" />,
            href: (settingConfig.settings.config.contact.path),
        }
    ];

    const uniqueLabels = Array.from(new Set(menus.map((menu) => menu.label)));

    return (
        <ScrollArea className="h-screen lg:w-48 sm:w-full rounded-md">
            <div className="md:px-4 sm:p-0 mt-5 ">
                {uniqueLabels.map((label, index) => (
                    <React.Fragment key={label}>
                        {label && (
                            <div className={`mx-4 mb-3 text-xs text-left tracking-wider font-bold text-black dark:text-slate-300 ${index > 0 ? 'mt-10' : ''}`}>
                                {label}
                            </div>
                        )}
                        {menus
                            .filter((menu) => menu.label === label)
                            .map((menu) => (
                                <React.Fragment key={menu.name}>
                                    {menu.submenu && menu.submenu.length > 0 ? (
                                        <Accordion
                                            key={menu.name}
                                            type="single"
                                            className="mt-[-10px] mb-[-10px] p-0 font-normal"
                                            collapsible
                                        >
                                            <AccordionItem value="item-1" className="m-0 p-0 font-normal">
                                                <AccordionTrigger>
                                                    <Link key={menu.name} className="w-full flex justify-start text-xs font-normal h-10 bg-background my-2 items-center p-4 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-background rounded-md" href={""}>
                                                        <div className={cn("flex justify-between w-full [&[data-state=open]>svg]:rotate-180")}>
                                                            <div className="flex items-center justify-center">
                                                                <div className="w-6">{menu.icon}</div>
                                                                {menu.name}
                                                            </div>
                                                            <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                                                        </div>
                                                    </Link>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    {menu.submenu.map((submenu) => (
                                                        <Link key={submenu.name} href={submenu.href} className="text-gray-400 mt-0 mb-0 flex text-xs h-10 bg-white dark:bg-background dark:hover:bg-primary dark:hover:text-background my-2 items-center p-4 hover:bg-primary hover:text-white rounded-md">
                                                            <div className="w-6">{submenu.icon}</div>
                                                            {submenu.name}
                                                        </Link>
                                                    ))}
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    ) : (
                                        <div key={menu.name}>
                                            <Link href={menu.href} className="flex text-xs h-10 bg-white dark:bg-background my-2 items-center p-4 hover:bg-primary dark:hover:bg-primary/10 dark:hover:text-background hover:text-white rounded-md">
                                                <div className="w-6">{menu.icon}</div>
                                                {menu.name}
                                            </Link>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                    </React.Fragment>
                ))}
            </div>
        </ScrollArea>
    );
}