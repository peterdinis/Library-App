describe("Register tests", () => {
    it("should visit localhost:3000/sign-up", () => {
      cy.visit("http://localhost:3000/sign-up");
      cy.url().should("include", "localhost:3000/sign-up");
    });
  });
  