describe("Login tests", () => {
    it("should visit localhost:3000/sign-in", () => {
      cy.visit("http://localhost:3000/sign-in");
      cy.url().should("include", "localhost:3000/sign-in");
    });
  });
  