
describe('Customers Functionality', () => {

    beforeEach(() => {
        // The login method is used in all tests in this suite.
        cy.login();
    });


    it('should display a grid of customers at /edit-customers', () => {
        // Visit the edit customers page.
        cy.goto('/edit-customer');

        // Check if the customers title exists and has the correct text.
        cy.get('[data-testid=edit-customer-title]')
            .should('exist')
            .should('have.text', 'Customers');

        // Check if the customers list exists.
        cy.get('[data-testid=customers-grid]')
            .should('exist');
    });
});
