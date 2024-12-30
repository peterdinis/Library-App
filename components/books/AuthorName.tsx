"use client"

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Empty from "../shared/Empty";
import { FC } from "react";

type AuthorNameProps = {
    authorId: string;
}

const AuthorName: FC<AuthorNameProps> = ({ authorId }: AuthorNameProps) => {
	const author = useQuery(api.authors.getAuthorById, { id: authorId });

	if (!author) return <Empty text="Spisovateľ/ka neexistuje" />

	return <p className="text-white font-medium text-large">{author.name}</p>;
};

export default AuthorName