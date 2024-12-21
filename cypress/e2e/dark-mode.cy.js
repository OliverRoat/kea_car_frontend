
describe('Dark-mode Functionality', () => {

    beforeEach(() => {
        // The login method is used in all tests in this suite.
        cy.login();
    });

    it('should allow user to toggle dark mode', () => {
        // Check if the button has the light toggle test-id
        cy.get('[data-testid=light-mode-toggle]')
            .should('exist');

        // Click the light mode toggle button.
        cy.get('[data-testid=light-mode-toggle]').click();

        // Check if the button has the dark toggle test-id
        cy.get('[data-testid=dark-mode-toggle]')
            .should('exist');

        // Check if the button has the dark toggle test-id
        cy.get('[data-testid=dark-mode-toggle]')
            .should('exist');

        // Click the dark mode toggle button.
        cy.get('[data-testid=dark-mode-toggle]').click();
    });
});