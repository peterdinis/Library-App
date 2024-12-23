export type Category = {
    id: string
    name: string
    description: string
}

export type CategoryUpdates = Partial<Omit<Category, "id">>;
