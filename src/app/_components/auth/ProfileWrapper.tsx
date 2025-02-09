import { FC } from "react";
import {useSession} from "next-auth/react";

const ProfileWrapper: FC = () => {
    const {data: session}  = useSession()
    return (
        <>
            {session?.user.email}
        </>
    )
}

export default ProfileWrapper