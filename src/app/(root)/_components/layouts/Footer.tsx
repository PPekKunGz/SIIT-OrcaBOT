"use client"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from 'next-themes'
import { InstagramIcon, LinkedinIcon } from "lucide-react"
import { navConfig } from "@/config/navLink";
import { useSession } from "next-auth/react"
import { mainConfig } from "@/config/mainConfig"

export function Footer() {
  const session = useSession();
  const { setTheme, themes, resolvedTheme } = useTheme()
  return (
    <footer className="bg-background py-8 sm:py-12 border-t">
      <div className="grid md:grid-cols-3 grid-rows-0 md:gap-4 gap-5">
        <div className="flex md:justify-end justify-center">
          <Link href="/" target="">
            <Image
              // src={resolvedTheme == "dark" ? mainConfig.logo.dark : mainConfig.logo.white}
              src={mainConfig.logo.white}
              alt="SIIT-Main-Logo"
              width={150}
              height={68}
              className="p-3"
              draggable="false"
              property=""
              priority
            />
          </Link>
        </div>
        <div className="flex justify-center">
          <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link 
              href="/privacy-policy" 
              className='inline-block relative hover:text-primary after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 after:ease-in-out hover:after:w-full'
              prefetch={false}>
              Privacy Policy
            </Link>
            <Link 
              href="/terms-condition" 
              className='inline-block relative hover:text-primary after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 after:ease-in-out hover:after:w-full'
              prefetch={false}>
              Terms and Conditions
            </Link>
            {session.data?.user.backend && session.data.user.backend.role == "ADMIN" && (
              <Link
                href={navConfig.links.dashboard}
                className='inline-block relative hover:text-primary after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 after:ease-in-out hover:after:w-full'
              >
                {navConfig.name.dashboard}
              </Link>
            )}
          </nav>
        </div>
        <div className="flex md:justify-start justify-center">
          <div className="flex items-center gap-4">
            <Link href="https://www.instagram.com/siit.orcabot/" target="_blank" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              <InstagramIcon className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="https://www.linkedin.com/company/siitorcabot" target="_blank" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              <LinkedinIcon className="h-5 w-5" />
              <span className="sr-only">Linkedin</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center text-xs text-muted-foreground sm:mt-12">
        <p>Copyright &copy; 2024 SIIT Academy Club - OrcaBOT</p>
        <div className="dark:text-gray-500 text-black/40">
          <p>Powered By.&nbsp;
            <Link href={"https://ppekkungz.in.th"} target="_blank" className="inline-block relative hover:text-muted-foreground after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all after:duration-300 after:ease-in-out hover:after:w-full">@PPekKunGzDev</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}