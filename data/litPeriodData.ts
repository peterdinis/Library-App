export enum LiteraryPeriod {
	ANTIQUITY = "Antika",
	RENAISSANCE = "Renesancia",
	BAROQUE = "Barok",
	CLASSICISM = "Klasicizmus",
	ENLIGHTENMENT = "Osvietenstvo",
	ROMANTICISM = "Romantizmus",
	REALISM = "Realizmus",
	NATURALISM = "Naturalizmus",
	SYMBOLISM = "Symbolizmus",
	MODERN = "Moderna",
	AVANT_GARDE = "Avantgarda",
	BETWEEN_WARS = "Medzivojnové obdobie",
	POST_WAR = "Povojnové obdobie",
	CONTEMPORARY = "Súčasná literatúra",
}

export const literaryPeriods: { value: LiteraryPeriod; label: string }[] = [
	{ value: LiteraryPeriod.ANTIQUITY, label: "Antika" },
	{ value: LiteraryPeriod.RENAISSANCE, label: "Renesancia" },
	{ value: LiteraryPeriod.BAROQUE, label: "Barok" },
	{ value: LiteraryPeriod.CLASSICISM, label: "Klasicizmus" },
	{ value: LiteraryPeriod.ENLIGHTENMENT, label: "Osvietenstvo" },
	{ value: LiteraryPeriod.ROMANTICISM, label: "Romantizmus" },
	{ value: LiteraryPeriod.REALISM, label: "Realizmus" },
	{ value: LiteraryPeriod.NATURALISM, label: "Naturalizmus" },
	{ value: LiteraryPeriod.SYMBOLISM, label: "Symbolizmus" },
	{ value: LiteraryPeriod.MODERN, label: "Moderna" },
	{ value: LiteraryPeriod.AVANT_GARDE, label: "Avantgarda" },
	{ value: LiteraryPeriod.BETWEEN_WARS, label: "Medzivojnové obdobie" },
	{ value: LiteraryPeriod.POST_WAR, label: "Povojnové obdobie" },
	{ value: LiteraryPeriod.CONTEMPORARY, label: "Súčasná literatúra" },
];

export type LiteraryPeriodOption = {
	value: LiteraryPeriod;
	label: string;
};
