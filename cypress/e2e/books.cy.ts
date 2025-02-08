describe("Books.cy.tsx", () => {
	it("should visit localhost:3000/books", () => {
		cy.visit("http://localhost:3000/books");
		cy.url().should("include", "localhost:3000/books");
	});
});
