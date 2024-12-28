"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
import type { FC } from "react";

const WelcomeWrapper: FC = () => {
	const { isSignedIn, user, isLoaded } = useUser();

	console.log(isSignedIn);
	console.log(user);
	console.log(isLoaded);

	if (!isLoaded) {
		return null;
	}

	if (isSignedIn) {
		return <div>Hello {user.fullName}!</div>;
	}

	return <>
		<SignOutButton redirectUrl="http:localhost:3000/">Logout</SignOutButton>
	</>;
};

export default WelcomeWrapper;
