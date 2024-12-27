"use client";

import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { CircularProgress } from "@nextui-org/react";
import { useQuery } from "convex/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { type FC, type Key, useMemo } from "react";
import Empty from "../shared/Empty";
import Header from "../shared/Header";

const PublisherDetail: FC = () => {
	const { id } = useParams();

	const publisherID = id as unknown as Id<"publishers">;

	const data = useQuery(api.publishers.getPublisherById, {
		id: publisherID,
	});

	const publisherDetail = useMemo(() => {
		return (
			<div
				className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10"
				key={id as unknown as Key}
			>
				<div>
					<h1 className="title-font mb-1 text-4xl font-medium dark:text-blue-50 text-gray-900">
						<span className="font-bold">Meno spisovateľa/ky</span>:{" "}
						<span>{data && data?.name}</span>
					</h1>
				</div>

				<div className="mb-4 mt-3 text-2xl font-light leading-relaxed dark:text-blue-50 text-gray-800">
					<div className="font-bold">Krátky popis: </div>
					<span>{data && data?.description}</span>
				</div>

				<div className="mb-4 mt-3 text-2xl font-light leading-relaxed dark:text-blue-50 text-gray-800">
					<div className="font-bold">Mesto: </div>
					<p>{data && data?.city}</p>
				</div>

				<div className="mb-4 mt-3 text-2xl font-light leading-relaxed dark:text-blue-50 text-gray-800">
					<div className="font-bold">Je aktívne: </div>
					<p>{data && data?.isActive}</p>
				</div>

				<div className="mb-4 mt-3 text-2xl font-light leading-relaxed dark:text-blue-50 text-gray-800">
					<div className="font-bold">Rok vytvorenia: </div>
					<p>{data && data?.createdDate}</p>
				</div>
			</div>
		);
	}, [data]);

	if (!id) {
		return <Empty text="Kniha neexistuje" />;
	}

	if (!data) {
		return <CircularProgress label="Načítavam..." />;
	}

	return (
		<>
			<Header text="Detail" />
			<section className="body-font mt-2 overflow-hidden dark:bg-background bg-white text-gray-700">
				<div className="container mx-auto px-5 py-12">
					<div className="mx-auto flex flex-wrap lg:w-4/5">
						<Image
							width={400}
							height={400}
							priority={true}
							alt={data && data?.name}
							className="w-full rounded-lg border object-cover object-center drop-shadow-md lg:w-1/2"
							src={data && data?.image!}
						/>
						{publisherDetail}
					</div>
				</div>
			</section>
		</>
	);
};

export default PublisherDetail;
