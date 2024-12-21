
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

    it('should allow user to set purchase flag to a car on the show car page (Require DB reinitialization because no create method)', () => {
        // Visit the edit cars page.
        cy.goto('/cars');

        // Click on a car card that does not include the 'car-purchased' class and the 'car-purchase-deadline-expired' class.
        cy.get('.car-card')
            .not('.car-purchased')
            .not('.car-purchase-deadline-expired')
            .first()
            .click();

        // Click the purchase button.
        cy.get('[data-testid=create-purchase-button]').click();

        // Check if the text of the button changes to 'Car is already purchased'.
        cy.get('[data-testid=create-purchase-button]')
            .should('have.text', 'Car is already purchased');
    });

    it('should allow user to delete a car (Require DB reinitialization because no create method)', () => {
        // Visit the edit cars page.
        cy.goto('/cars');

        // Click on a car card that does include the 'car-purchased' class.
        cy.get('.car-card')
            .not('.car-purchased')
            .first()
            .click();

        // Click the delete button.
        cy.get('[data-testid=delete-car-button]').click();

        // if the confirm delete dialog is visible, also click the confirm delete button.
        // but only if the dialog is visible.
        cy.get('body').then(($body) => {
            if ($body.find('[data-testid=confirm-delete-modal]').length > 0) {
                // Modal exists, now check if it's visible
                cy.get('[data-testid=confirm-delete-modal]').then(($dialog) => {
                    if ($dialog.is(':visible')) {
                        cy.get('[data-testid=confirm-delete-button]').click();
                    }
                });
            }
        });

        // Check if the page is redirected to the edit cars page.
        cy.url().should('contain', '/cars');
    });
});
