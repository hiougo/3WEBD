describe('Module de Recherche Avancée', () => {

    beforeEach(() => {
        // On bloque le chargement lourd pour que les tests soient rapides
        cy.intercept('GET', '**/recentchanges.json*', { body: [] }).as('blockHeavyLoad');
        cy.visit('http://localhost:5173');
    });

    // --- TON TEST (Interface UI) ---
    it('UI : Ouverture, fermeture et persistance du formulaire', () => {
        // 1. Vérifier que c'est fermé au début
        cy.contains('Title').should('not.exist');

        // 2. Ouvrir (Avec la sécurité :visible pour éviter les erreurs futures)
        cy.get('button')
            .contains(/advanced search/i)
            .filter(':visible')
            .click();

        // 3. Vérifier les éléments
        cy.contains('Title', { matchCase: false }).should('be.visible');
        cy.contains('Author').should('be.visible');

        // 4. Interaction formulaire
        cy.get('input[placeholder="Harry Potter..."]')
            .should('be.visible')
            .type('Le Petit Prince')
            .should('have.value', 'Le Petit Prince');

        // 5. Fermer le panneau
        // (Ici on clique sur le bouton "Close Search" ou la croix)
        cy.contains('button', 'Close Search').click();

        // 6. Vérifier que c'est bien fermé
        cy.contains('Title').should('not.exist');
    });


    // --- MON TEST (Logique de recherche) ---
    it('Fonctionnel : Lancer une recherche et accéder au livre', () => {
        // 1. Ouvrir
        cy.get('button').contains(/advanced search/i).filter(':visible').first().click();

        // 2. Remplir
        cy.get('input[placeholder="Harry Potter..."]').type('Dune');

        // 3. Lancer (via le texte spécifique du bouton du bas)
        cy.contains('button', 'Recherche').click();

        // 4. Vérifier résultats
        cy.contains('Results for', { matchCase: false }).should('be.visible');
        cy.get('a[href*="/book/"]', { timeout: 10000 })
            .should('have.length.gt', 0)
            .first()
            .click();
        // 5. Vérifier navigation
        cy.url().should('include', '/book/');
    });

});