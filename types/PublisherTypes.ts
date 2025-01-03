export type PublisherType = {
	_id?: string;
	name: string;
	description: string;
	image: string;
	city: string;
	isActive: boolean;
	createdDate: string;
};

export type PublisherUpdates = Partial<Omit<PublisherType, "_id">>;
