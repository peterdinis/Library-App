export type Category = {
	_id?: string;
	name: string;
	description: string;
};

export type CategoryUpdates = Partial<Omit<Category, "_id">>;
