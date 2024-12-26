"use client"

import type { FC } from "react";
import { useUser } from "@clerk/nextjs";

const WelcomeWrapper: FC = () => {
    
    const { isSignedIn, user, isLoaded } = useUser()

    console.log(isSignedIn)
    console.log(user)
    console.log(isLoaded)

  if (!isLoaded) {
    // Handle loading state
    return null
  }

  if (isSignedIn) {
    return <div>Hello {user.fullName}!</div>
  }
    
    return (
        <>
            Welcome
        </>
    )
}

export default WelcomeWrapper