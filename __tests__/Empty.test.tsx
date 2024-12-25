import Empty from "@/components/shared/Empty";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Empty Component", () => {
	it("renders the correct text when provided", () => {
		const testText = "Hello, Vitest!";
		render(<Empty text={testText} />);

		const emptyComponentElement = screen.getByRole("div");
		expect(emptyComponentElement).toBeDefined();
		expect(emptyComponentElement).toHaveTextContent(testText);
	});

	it("renders the failed text when provided", () => {
		const testText = "Hello, Vitest!";
		render(<Empty text={testText} />);

		const emptyComponentElement = screen.getByRole("div");
		expect(emptyComponentElement).toBeDefined();
		expect(emptyComponentElement).not.toHaveTextContent("Hello Vite");
	});
});
