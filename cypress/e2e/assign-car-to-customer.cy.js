
describe('Assign Car to Customer', () => {

    /**
     * Note: This test suite is designed to run progressively to make it easier to debug.
     * So, instead of running all tests in a single run, it executes each preceding steps until
     * it reaches the final step that is currently being tested.
     */

    beforeEach(() => {
        // The login method is used in all tests in this suite.
        cy.login();
    });

    it('step 1: /brands should allow the user to select a brand from a grid', () => {
        // Visit the brands page.
        cy.goto('/brands');

        // Check if the page contains multiple brand cards.
        cy.get('.brand-card')
            .should('have.length.greaterThan', 0);

        // Click on a random brand card.
        cy.get('.brand-card')
            .first()
            .click();

        // Check if the page is redirected to the models page.
        cy.url().should('contain', '/brands/');
    });

    it('step 2: /brands/:brand_name should allow the user to select a model from a grid', () => {
        // Visit the brands page.
        cy.goto('/brands');

        // Click on a random brand card.
        cy.get('.brand-card')
            .first()
            .click();

        // Check if the page is redirected to the brands page.
        cy.url().should('contain', '/brands/');

        // Check if the page contains multiple model cards.
        cy.get('.model-card')
            .should('have.length.greaterThan', 0);

        // Click on a random model card.
        cy.get('.model-card')
            .first()
            .click();

        // Check if the page is redirected to the colors page.
        cy.url().should('contain', '/models/');
    });

    it('step 3: /models/:model_name/colors should allow the user to select a color from a grid', () => {
        // Visit the brands page.
        cy.goto('/brands');

        // Click on a random brand card.
        cy.get('.brand-card')
            .first()
            .click();

        // Check if the page is redirected to the models page.
        cy.url().should('contain', '/brands/');

        // Click on a random model card.
        cy.get('.model-card')
            .first()
            .click();

        // Check if the page is redirected to the colors page.
        cy.url().should('contain', '/colors');

        // Check if the page contains multiple color cards.
        cy.get('.color-card')
            .should('have.length.greaterThan', 0);

        // Click on a random color card.
        cy.get('.color-card')
            .first()
            .click();

        // Check if the page is redirected to the accessories page.
        cy.url().should('contain', '/colors/');
    });

    it('step 4: /colors/:color_name/accessories should allow the user to select an accessory from a grid', () => {
        // Visit the brands page.
        cy.goto('/brands');

        // Click on a random brand card.
        cy.get('.brand-card')
            .first()
            .click();

        // Check if the page is redirected to the models page.
        cy.url().should('contain', '/brands/');

        // Click on a random model card.
        cy.get('.model-card')
            .first()
            .click();

        // Check if the page is redirected to the colors page.
        cy.url().should('contain', '/colors');

        // Click on a random color card.
        cy.get('.color-card')
            .first()
            .click();

        // Check if the page is redirected to the accessories page.
        cy.url().should('contain', '/accessories');

        // Check if the page contains multiple accessory checkboxes.
        cy.get('.accessory-checkbox')
            .should('have.length.greaterThan', 0);

        // Click on a random accessory checkbox.
        cy.get('.accessory-checkbox')
            .first()
            .click();

        // Click on the save-car-configuration button.
        cy.get('[data-testid=save-car-configuration]').click();

        // Check if the page is redirected to the customers page.
        cy.url().should('contain', '/customers');
    });

    it('step 5: /customers should allow the user to select a customer from a grid', () => {
        // Visit the brands page.
        cy.goto('/brands');

        // Click on a random brand card.
        cy.get('.brand-card')
            .first()
            .click();

        // Check if the page is redirected to the models page.
        cy.url().should('contain', '/brands/');

        // Click on a random model card.
        cy.get('.model-card')
            .first()
            .click();

        // Check if the page is redirected to the colors page.
        cy.url().should('contain', '/colors');

        // Click on a random color card.
        cy.get('.color-card')
            .first()
            .click();

        // Check if the page is redirected to the accessories page.
        cy.url().should('contain', '/accessories');

        // Check if the page contains multiple accessory checkboxes.
        cy.get('.accessory-checkbox')
            .should('have.length.greaterThan', 0);

        // Click on a random accessory checkbox.
        cy.get('.accessory-checkbox')
            .first()
            .click();

        // Click on the save-car-configuration button.
        cy.get('[data-testid=save-car-configuration]').click();

        // Check if the page is redirected to the customers page.
        cy.url().should('contain', '/customers');

        // Check if the page contains multiple customer cards.
        cy.get('.customer-card')
            .should('have.length.greaterThan', 0);

        // Click on a random customer card.
        cy.get('.customer-card')
            .first()
            .click();

        // Check if the page is redirected to the car-receipt page.
        cy.url().should('contain', '/car-receipt/');
    });

    it('step 6: /car-receipt/ should allow the user to see details of the car assigned to the customer', () => {
        // Visit the brands page.
        cy.goto('/brands');

        // Click on a random brand card.
        cy.get('.brand-card')
            .first()
            .click();

        // Check if the page is redirected to the models page.
        cy.url().should('contain', '/brands/');

        // Click on a random model card.
        cy.get('.model-card')
            .first()
            .click();

        // Check if the page is redirected to the colors page.
        cy.url().should('contain', '/colors');

        // Click on a random color card.
        cy.get('.color-card')
            .first()
            .click();

        // Check if the page is redirected to the accessories page.
        cy.url().should('contain', '/accessories');

        // Check if the page contains multiple accessory checkboxes.
        cy.get('.accessory-checkbox')
            .should('have.length.greaterThan', 0);

        // Click on a random accessory checkbox.
        cy.get('.accessory-checkbox')
            .first()
            .click();

        // Click on the save-car-configuration button.
        cy.get('[data-testid=save-car-configuration]').click();

        // Check if the page is redirected to the customers page.
        cy.url().should('contain', '/customers');

        // Check if the page contains multiple customer cards.
        cy.get('.customer-card')
            .should('have.length.greaterThan', 0);

        // Click on a random customer card.
        cy.get('.customer-card')
            .first()
            .click();

        // Check if the page is redirected to the car-receipt page.
        cy.url().should('contain', '/car-receipt/');

        // Check if the page contains a car image data-testid=car-receipt-image.
        cy.get('[data-testid=car-receipt-image]')
            .should('exist');

        // Check if the page contains a car model data-testid=car-receipt-model.
        cy.get('[data-testid=car-receipt-model]')
            .should('exist');

        // Check if the page contains a car accessory data-testid=car-receipt-accessories.
        cy.get('[data-testid=car-receipt-color]')
            .should('exist');

        // Check if the page contains a car insurances data-testid=car-receipt-insurances.
        cy.get('[data-testid=car-receipt-insurances]')
            .should('exist');

        // Check if the page contains a car customer data-testid=car-receipt-customer.
        cy.get('[data-testid=car-receipt-customer]')
            .should('exist');

        // Check if the page contains a car sales-person data-testid=car-receipt-salesperson.
        cy.get('[data-testid=car-receipt-salesperson]')
            .should('exist');

        // Check if the page contains a car price data-testid=car-receipt-total-price.
        cy.get('[data-testid=car-receipt-total-price]')
            .should('exist');

        // Check if the page contains a car seasonal tires recommendation text data-testid=seasonal-tires-text.
        cy.get('[data-testid=seasonal-tires-text]')
            .should('exist');
    });
});
