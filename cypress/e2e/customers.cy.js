
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

    it('should display an error message when adding a new customer without required fields', () => {
        // Visit the edit customers page.
        cy.goto('/edit-customer');

        // Click the add customer button.
        cy.get('#create-customer').click();

        // Click the save button.
        cy.get('#save-new-customer-button').click();
        // The alert message should display 'First Name is required'
        cy.get('[data-testid=new-customer-error-alert]')
            .should('have.text', 'First Name is required');
        // Add the first name
        cy.get('#new-customer-first-name-input').type('John');

        // Click the save button.
        cy.get('#save-new-customer-button').click();
        // The alert message should display 'Last Name is required'
        cy.get('[data-testid=new-customer-error-alert]')
            .should('have.text', 'Last Name is required');
        // Add the last name
        cy.get('#new-customer-last-name-input').type('Doe');

        // Click the save button.
        cy.get('#save-new-customer-button').click();
        // The alert message should display 'Email is required'
        cy.get('[data-testid=new-customer-error-alert]')
            .should('have.text', 'Email is required');
        // Add the email
        cy.get('#new-customer-email-input').type('random@localhost.com');

        // Click the save button.
        cy.get('#save-new-customer-button').click();
        // The alert message should display 'Phone Number is required'
        cy.get('[data-testid=new-customer-error-alert]')
            .should('have.text', 'Phone Number is required');
        // Add the phone number
        cy.get('#new-customer-phone-number-input').type('12345678');

        // Click the save button.
        cy.get('#save-new-customer-button').click();
        // The alert message should display 'Address is required'
        cy.get('[data-testid=new-customer-error-alert]')
            .should('have.text', 'Address is required');
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

    // All fields are required for edit
    it ('should display an error message when editing a customer without required fields', () => {
        // Visit the edit customers page.
        cy.goto('/edit-customer');

        // Click a random edit button.
        cy.get('.edit-button').first().click();

        // Ensure check works for first name
        cy.get('#edit-customer-first-name-input').clear();
        cy.get('#save-edit-customer-button').click();
        cy.get('#edit-customer-alert')
            .should('have.text', 'All fields are required');
        // Add the first name
        cy.get('#edit-customer-first-name-input').type('Jane');

        // Ensure check works for last name
        cy.get('#edit-customer-last-name-input').clear();
        cy.get('#save-edit-customer-button').click();
        cy.get('#edit-customer-alert')
            .should('have.text', 'All fields are required');
        // Add the last name
        cy.get('#edit-customer-last-name-input').type('Doe');

        // Ensure check works for email
        cy.get('#edit-customer-email-input').clear();
        cy.get('#save-edit-customer-button').click();
        cy.get('#edit-customer-alert')
            .should('have.text', 'All fields are required');
        // Add the email
        cy.get('#edit-customer-email-input').type('random@localhost.com');

        // Ensure check works for phone number
        cy.get('#edit-customer-phone-number-input').clear();
        cy.get('#save-edit-customer-button').click();
        cy.get('#edit-customer-alert')
            .should('have.text', 'All fields are required');
        // Add the phone number
        cy.get('#edit-customer-phone-number-input').type('12345678');

        // Ensure check works for address
        cy.get('#edit-customer-address-input').clear();
        cy.get('#save-edit-customer-button').click();
        cy.get('#edit-customer-alert')
            .should('have.text', 'All fields are required');
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
