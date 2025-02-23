describe("Homepage Tests", () => {
  it("should visit localhost:3000", () => {
    cy.visit("http://localhost:3000");
    cy.url().should("include", "localhost:3000");
  });

  it("should click the book button and navigate to /books", () => {
    cy.visit("http://localhost:3000");
    cy.get("#bookBtn").click();

    cy.url().should("include", "/books");
  });

  it("should click the school button and navigate to the school website", () => {
    cy.visit("http://localhost:3000");
    cy.get("#schollBtn").invoke("removeAttr", "target").click();
    cy.url().should("include", "spsbj.sk");
  });
});
