export type Category = {
	name: string;
	description: string;
};

export type CategoryUpdates = Partial<Omit<Category, "_id">>;
