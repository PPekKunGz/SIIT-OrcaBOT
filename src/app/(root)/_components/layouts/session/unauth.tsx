import { Button } from "@/components/ui/button"
import { EnvelopeOpenIcon } from "@radix-ui/react-icons"
import { signIn } from "next-auth/react"

export default function UnAuthSession() {
    return (
        <div className="flex items-center justify-center min-h-screen h-full">
            <div className="h-fit">
                <div className="flex flex-col items-center justify-center gap-3 dark:bg-black/20 bg-zinc-600 border-b-4 text-white p-10 rounded-lg shadow-md">
                    {/* <p className="font-bold text-3xl">You are not Sign In!</p>
                    <p className="-translate-y-[10px]">This form will open on August 13, 2024</p> */}
                    {/* <p className="text-red-500 -translate-y-2">*Please use 6*********@g.siit.tu.ac.th</p>
                    <Button onClick={() => signIn('google')}>
                        <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Login with Google
                    </Button> */}
                </div>
            </div>
        </div>
    )
}