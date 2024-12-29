"use client";

import { useUser } from "@clerk/nextjs";
import { type FC, type ReactNode, useMemo } from "react";
import Empty from "../shared/Empty";

interface AdminProps {
	children?: ReactNode;
}

const Admin: FC<AdminProps> = ({ children }) => {
	const { user, isLoaded } = useUser();

	const hasAdminAccess = useMemo(() => {
		return user?.organizationMemberships?.some(
			(item) => item?.organization.name === "Admins",
		);
	}, [user]);

	if (!isLoaded) {
		return <Empty text="Presmeruvávam..." />;
	}

	if (!hasAdminAccess) {
		return <Empty text="K tejto akcií nemáte prístup" />;
	}

	return <>{children}</>;
};

export default Admin;
