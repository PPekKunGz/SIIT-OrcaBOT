"use client"

import { SessionContextValue, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SessionProps {
    session: SessionContextValue<boolean>
}

const Profile: React.FC<SessionProps> = ({ session }) => {
    if (!session.data || !session.data.user) {
        return (<div></div>)
    }
    const { data } = useSession();
    return (
        <div>
            <Avatar>
                <AvatarImage src={data?.user?.image || ""} />
                <AvatarFallback>{session.data.user.name}</AvatarFallback>
            </Avatar>
        </div>
    )
}
export default Profile;