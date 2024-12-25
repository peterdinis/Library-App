import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Header from "../components/shared/Header";

describe("Header Component", () => {
	it("renders the correct text when provided", () => {
		const testText = "Hello, Vitest!";
		render(<Header text={testText} />);

		const headerElement = screen.getByRole("heading");
		expect(headerElement).toBeDefined();
		expect(headerElement).toHaveTextContent(testText);
	});

	it("renders the failed text when provided", () => {
		const testText = "Hello, Vitest!";
		render(<Header text={testText} />);

		const headerElement = screen.getByRole("heading");
		expect(headerElement).toBeDefined();
		expect(headerElement).not.toHaveTextContent("Hello Vite");
	});
});
