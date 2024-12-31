"use client";

import { Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import type { FC } from "react";

const Settings: FC= () => {
	return (
		<Card>
			<CardHeader>
				<h2 className="text-xl font-bold">Môj profil</h2>
			</CardHeader>
			<CardBody>
				<form className="space-y-4">
					<div className="space-y-2">
						<span
							className="text-sm font-medium leading-none"
						>
							Email
						</span>
						<Input
							disabled={true}
							id="email"
						/>
					</div>
					<div className="space-y-2">
						<span
							className="text-sm font-medium leading-none"
						>
							Meno
						</span>
						<Input
							id="meno"
							placeholder="Meno"
							disabled={true}
						/>
					</div>
					<div className="space-y-2">
						<span
							className="text-sm font-medium leading-none"
						>
							Priezvisko
						</span>
						<Input
							id="priezvisko"
							placeholder="Priezvisko"
							disabled={true}
						/>
					</div>
				</form>
			</CardBody>
		</Card>
	);
};

export default Settings;