"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { type FC, type ReactNode, useMemo } from "react";
import Empty from "../shared/Empty";

interface AdminProps {
	children?: ReactNode;
}

const Admin: FC<AdminProps> = ({ children }) => {
	const { user, isLoaded } = useUser();
	const router = useRouter();

	// Check if the user has admin access
	const hasAdminAccess = useMemo(() => {
		return user?.organizationMemberships?.some(
			(item) => item?.organization.name === "Admins",
		);
	}, [user]);

	// If the user data is still loading or not available, show an empty state or a loader
	if (!isLoaded) {
		return <Empty text="Loading..." />;
	}

	// If no user is logged in, redirect to the login page (or another appropriate route)
	if (!user) {
		router.push("/login"); // Change to your login page route
		return null;
	}

	// If the user doesn't have admin access, show the access denied message
	if (!hasAdminAccess) {
		return <Empty text="K tejto akcií nemáte prístup" />;
	}

	// Render children if the user is logged in and has admin access
	return <>{children}</>;
};

export default Admin;
