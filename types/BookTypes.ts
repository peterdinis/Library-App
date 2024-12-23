export type Book = {
	id: string;
	name: string;
	description: string;
	year: number;
	image: string;
	pages: number;
	isAvailable: boolean;
	categoryId: string;
};

export type BookUpdates = Partial<Omit<Book, "id">>;
