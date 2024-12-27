export type Book = {
	_id?: string;
	name: string;
	description: string;
	year: number;
	image: string;
	pages: number;
	isAvailable: boolean;
	categoryId: string;
	authorId: string;
	publisherId: string;
};

export type BookUpdates = Partial<Omit<Book, "_id">>;
