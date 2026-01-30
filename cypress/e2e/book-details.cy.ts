describe('Page de Détail du Livre', () => {
    it('charge les informations d\'un livre spécifique via URL', () => {
        // On visite une ID connue (ex: Le Seigneur des Anneaux ou un classique stable)
        // OL27448W est l'ID work pour "The Lord of the Rings"
        cy.visit('http://localhost:5173/book/OL27448W')

        // Vérifier le chargement
        cy.contains(/decrypting file data/i).should('not.exist') // Le loader doit disparaitre

        // Vérifier les éléments clés de ton design Brutaliste
        cy.contains('EVIDENCE #OL27448W').should('exist') // Ton sticker ID
        cy.contains('Library Summary').should('be.visible')

        // Vérifier le bouton retour
        cy.contains('Back to Database', { matchCase: false }).should('be.visible').click()

        // Vérifier qu'on revient bien en arrière (ou à l'accueil si pas d'historique)
        cy.url().should('not.include', '/book/OL27448W')
    })
})