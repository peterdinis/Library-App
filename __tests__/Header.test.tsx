import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "../components/shared/Header";

describe("Header Component", () => {
    it("renders the correct text when provided", () => {
        const testText = "Hello, Vitest!";
        render(<Header text={testText} />);
    
        // Check if the text is rendered
        const headerElement = screen.getByRole("heading");
        expect(headerElement).toBeDefined()
        expect(headerElement).toHaveProperty(testText)
      });

});
