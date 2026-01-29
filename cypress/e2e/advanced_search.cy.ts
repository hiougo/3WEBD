describe('Test de la recherche avancée', () => {
  it('affiche et cache le formulaire au clic sur le bouton', () => {
    cy.visit('http://localhost:5173')
    cy.contains('Title').should('not.exist')
    cy.get('button').contains(/advanced search/i).click()
    cy.contains('Title', { matchCase: false }).should('exist').and('be.visible')
    cy.contains('Author').should('be.visible')
    cy.get('input[placeholder="Harry Potter..."]')
      .type('Le Petit Prince')
      .should('have.value', 'Le Petit Prince')
    cy.contains('Close Search').click()
    cy.contains('Title').should('not.exist')
  })
})