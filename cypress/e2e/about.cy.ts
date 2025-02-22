describe("About Page tests", () => {
	it("should visit localhost:3000/about", () => {
		cy.visit("http://localhost:3000/about");
		cy.url().should("include", "localhost:3000/about");
	});
});
