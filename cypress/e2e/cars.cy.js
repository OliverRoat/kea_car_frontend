
describe('Cars Functionality (List, Show, Purchase-Flag, Delete)', () => {

    beforeEach(() => {
        // The login method is used in all tests in this suite.
        cy.login();
    });

    it('should display a grid of cars at /cars', () => {
        // Visit the edit cars page.
        cy.goto('/cars');

        // Check if the cars title exists and has the correct text.
        cy.get('[data-testid=cars-list-title]')
            .should('exist')
            .should('have.text', 'Cars');

        // Check if the cars list exists.
        cy.get('[data-testid=cars-grid]')
            .should('exist');

        // Check if the cars list has at least one car.
        cy.get('[data-testid=cars-grid] div')
            .should('have.length.greaterThan', 0);
    });

    it('should allow user to show a car', () => {
        // Visit the edit cars page.
        cy.goto('/cars');

        // Click on a random car card.
        cy.get('.car-card')
            .first()
            .click();

        // Check if the page is redirected to the show car page.
        cy.url().should('contain', '/car/');

        // Check if the car display a show-car-model-name with some text.
        cy.get('[data-testid=show-car-model-name]')
            .should('exist')
            .should('not.have.text', '');
    });
});
