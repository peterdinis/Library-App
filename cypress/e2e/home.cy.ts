describe('Home.cy.tsx', () => {
  it('should visit localhost:3000', () => {
    cy.visit('http://localhost:3000');

    cy.url().should('include', 'localhost:3000');
  });

  it('should click the book button and navigate to /books', () => {
    cy.visit('http://localhost:3000');
    cy.get('#bookBtn').click();
    cy.url().should('include', '/books');
  });
});