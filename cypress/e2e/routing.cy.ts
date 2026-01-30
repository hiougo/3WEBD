describe('Navigation et Routing', () => {
    it('Affiche la page 404 personnalisée sur une URL inconnue', () => {
        // 1. On visite une page qui n'existe pas
        cy.visit('http://localhost:5173/page-qui-nexiste-pas-12345');

        // 2. On vérifie les éléments clés de ton design (visibles sur ton image)
        cy.contains('ERROR 404').should('be.visible');
        cy.contains('File corrupted or missing').should('be.visible');

        // 3. (Bonus) On teste que le lien de retour fonctionne
        cy.contains('RETURN TO SAFETY').click();

        // On devrait être revenu à l'accueil
        cy.url().should('eq', 'http://localhost:5173/');
    });
});