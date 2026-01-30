describe('Mocking API Open Library', () => {
    it('affiche correctement les données simulées', () => {
        // 1. On "intercepte" l'appel vers openlibrary.org
        cy.intercept('GET', '**/search.json*', {
            statusCode: 200,
            body: {
                numFound: 1,
                docs: [
                    {
                        key: '/works/OL12345TEST',
                        title: 'Test Cypress Book',
                        author_name: ['Tester Robot'],
                        first_publish_year: 2024,
                        cover_i: 12345
                    }
                ]
            }
        }).as('searchBooks') // On lui donne un alias

        cy.visit('http://localhost:5173/search?title=Test')

        // 2. On attend que l'appel intercepté se fasse
        cy.wait('@searchBooks')

        // 3. On vérifie que TON interface affiche TA fausse donnée
        cy.contains('Test Cypress Book').should('be.visible')
        cy.contains('Tester Robot').should('be.visible')
    })
    it('Affiche une erreur propre si l\'API plante', () => {
        // On force l'API à renvoyer une erreur 500
        cy.intercept('GET', '**/search.json*', {
            statusCode: 500,
            body: { error: 'Internal Server Error' }
        }).as('serverError');

        cy.visit('http://localhost:5173/search?q=test');

        // Vérifie que tu affiches un message (ou au moins que l'app ne crashe pas)
        // Tu n'as peut-être pas encore codé ça dans ton React, c'est l'occasion !
        cy.contains('Void detected').should('exist'); // Ou un message "System Failure"
    });
})

