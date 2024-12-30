"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import type { FC } from "react";
import Empty from "../shared/Empty";

type AuthorNameProps = {
	authorId: string;
};

const AuthorName: FC<AuthorNameProps> = ({ authorId }: AuthorNameProps) => {
	const author = useQuery(api.authors.getAuthorById, { id: authorId });

	if (!author) return <Empty text="Spisovateľ/ka neexistuje" />;

	return <p className="text-white mt-2 font-medium text-xl">{author.name}</p>;
};

export default AuthorName;
