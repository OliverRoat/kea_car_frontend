
describe('Customers Functionality (List, Create, Edit and Delete)', () => {

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

        // Check if the customers list has at least one customer.
        cy.get('[data-testid=customers-grid] div')
            .should('have.length.greaterThan', 0);
    });

    it('should allow user to add a new customer', () => {
        // Visit the edit customers page.
        cy.goto('/edit-customer');

        // Click the add customer button.
        cy.get('#create-customer').click();

        const randomEmail = `john-${Date.now()}@doe.com`;

        // Fill in the customer information.
        // These are ids because they are used by Jmeter web driver sampler.
        cy.get('#new-customer-first-name-input').type('John');
        cy.get('#new-customer-last-name-input').type('Doe');
        cy.get('#new-customer-email-input').type(randomEmail);
        cy.get('#new-customer-phone-number-input').type('12345678');
        cy.get('#new-customer-address-input').type('1234 Test St.');

        // Click the save button.
        cy.get('#save-new-customer-button').click();

        // Check if the page is redirected to the edit customers page.
        cy.url().should('contain', '/edit-customer');

        // Find the customer with the email we just created.
        cy.get('[data-testid=customers-grid] div')
            .contains(randomEmail)
            .should('exist');
    });

    it('should allow user to edit a new customer', () => {
         // Visit the edit customers page.
         cy.goto('/edit-customer');

         // Click a random edit button.
         cy.get('.edit-button').first().click();

         // Check if the edit customer dialog is visible.
         cy.get('[data-testid=edit-customer-dialog]')
            .should('be.visible');

        const randomEmail = `jane-${Date.now()}@doe.com`;

        // Fill in the customer information.
        cy.get('#edit-customer-first-name-input').clear().type('Jane');
        cy.get('#edit-customer-last-name-input').clear().type('Doe');
        cy.get('#edit-customer-email-input').clear().type(randomEmail);
        cy.get('#edit-customer-phone-number-input').clear().type('87654321');
        cy.get('#edit-customer-address-input').clear().type('4321 Test St.');

        // Click the save button.
        cy.get('#save-edit-customer-button').click();

        // Check if the dialog is closed.
        cy.get('[data-testid=edit-customer-dialog]')
            .should('not.be.exist');

        // Check if the alert says the customer has been updated.
        cy.get('#edit-customer-alert')
            .should('have.text', 'Customer updated successfully');

        // Check if the customer has been updated.
        cy.get('[data-testid=customers-grid] div')
            .contains(randomEmail)
            .should('exist');
    });

    it('should allow user to delete a new customer', () => {
        // Visit the edit customers page.
        cy.goto('/edit-customer');

        // Click a random delete button.
        cy.get('.delete-button').first().click();

        // Check if the alert says the customer has been deleted.
        cy.get('#edit-customer-alert')
            .should('have.text', 'Customer deleted successfully');
    });
});
