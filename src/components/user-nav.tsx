"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useSession, signIn, signOut } from "next-auth/react"

export function UserNav() {
  const session = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8 border dark:border-white'>
            <AvatarImage src='/avatars/01.png' alt='@shadcn' />
            <AvatarFallback>SIIT</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>data.displayname_th</p>
            <p className='text-xs leading-none text-muted-foreground'>
              email@tu.ac.th
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {
          session.status == "authenticated" && <DropdownMenuItem onClick={() => signOut()} className='cursor-pointer'>
            Log out
          </DropdownMenuItem>
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
