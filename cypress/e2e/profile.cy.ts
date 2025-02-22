describe("Profile tests", () => {
	it("should visit localhost:3000/profile", () => {
		cy.visit("http://localhost:3000/profile");
		cy.url().should("include", "localhost:3000/profile");
	});
});
