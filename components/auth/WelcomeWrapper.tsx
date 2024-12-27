"use client";

import { useUser } from "@clerk/nextjs";
import type { FC } from "react";

const WelcomeWrapper: FC = () => {
	const { isSignedIn, user, isLoaded } = useUser();

	console.log(isSignedIn);
	console.log(user);
	console.log(isLoaded);

	if (!isLoaded) {
		// Handle loading state
		return null;
	}

	if (isSignedIn) {
		return <div>Hello {user.fullName}!</div>;
	}

	return <>Welcome</>;
};

export default WelcomeWrapper;
