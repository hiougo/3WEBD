it('S\'affiche correctement sur mobile', () => {
    cy.viewport('iphone-x');
    cy.visit('http://localhost:5173');
    cy.get('button').contains(/advanced search/i).click();
    cy.get('input[placeholder="Harry Potter..."]').should('be.visible');
});