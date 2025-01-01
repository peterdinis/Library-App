"use client";

import { useUser } from "@clerk/nextjs";
import { Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { format } from "date-fns";
import { type FC, useMemo } from "react";

const Settings: FC = () => {
	const { user } = useUser();

	const organizationMember = useMemo(() => {
		return user?.organizationMemberships[0]?.organization?.name;
	}, [user]);

	const createdDateForAccount = useMemo(() => {
		if (user?.createdAt) {
			return format(new Date(user.createdAt), "dd.MM.yyyy");
		}
		return "";
	}, [user]);

	return (
		<Card>
			<CardHeader>
				<h2 className="text-xl font-bold">Môj profil</h2>
			</CardHeader>
			<CardBody>
				<form className="space-y-4">
					<div className="space-y-2">
						<span className="text-sm font-medium leading-none">Email</span>
						<Input
							disabled={true}
							id="email"
							value={user?.emailAddresses[0].emailAddress}
						/>
					</div>
					<div className="space-y-2">
						<span className="text-sm font-medium leading-none">Meno</span>
						<Input
							id="meno"
							placeholder="Meno"
							disabled={true}
							value={user?.firstName!}
						/>
					</div>
					<div className="space-y-2">
						<span className="text-sm font-medium leading-none">Priezvisko</span>
						<Input
							id="priezvisko"
							value={user?.lastName!}
							placeholder="Priezvisko"
							disabled={true}
						/>
					</div>
					<div className="space-y-2">
						<span className="text-sm font-medium leading-none">Rola</span>
						<Input
							id="priezvisko"
							value={organizationMember}
							placeholder="Rola"
							disabled={true}
						/>
					</div>
					<div className="space-y-2">
						<span className="text-sm font-medium leading-none">
							Učet bol vytvorený dňa
						</span>
						<Input
							id="priezvisko"
							value={createdDateForAccount}
							placeholder="Rola"
							disabled={true}
						/>
					</div>
				</form>
			</CardBody>
		</Card>
	);
};

export default Settings;
