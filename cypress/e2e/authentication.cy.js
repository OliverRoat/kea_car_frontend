
describe('Authentication Functionality (Login, Logout and Protected Paths)', () => {

  /**
   * The beforeEach hook is not used in this test suite because
   * the login method already redirects the user to the login page
   * to ensure the login method is working as expected.
   */

  it('should display login form', () => {
    // Visit the login page.
    cy.goto('/login');

    // Check if the login title exists and has the correct text.
    cy.get('[data-testid=login-title]')
      .should('exist')
      .should('have.text', 'Login');

    // Check if the email input exists and has the correct attributes.
    cy.get('[data-testid=email-login-input] input')
      .should('exist')
      .should('have.value', '')
      .should('have.attr', 'type', 'email');

    // Check if the password input exists and has the correct attributes.
    cy.get('[data-testid=password-login-input] input')
      .should('exist')
      .should('have.value', '')
      .should('have.attr', 'type', 'password');

    // Check if the login button exists and has the correct attributes.
    cy.get('[data-testid=login-button]')
      .should('exist')
      .should('have.attr', 'type', 'button')
      .should('have.text', 'Login');
  });

  it('should allow user to login', () => {
    // This is a command because we will need to use it in multiple tests.
    cy.login();
  });

  it('should display an error if the user tries to login without email or password', () => {
    // Visit the login page.
    cy.goto('/login');

    // Click the login button.
    cy.get('[data-testid=login-button]').click();

    // Ensure validation works for email.
    cy.get('[data-testid=login-error-alert]')
      .should('exist')
      .should('have.text', 'Email is required');
    // add email
    cy.get('[data-testid=email-login-input] input').type('test@localhost.com');

    // Click the login button again.
    cy.get('[data-testid=login-button]').click();

    // Ensure validation works for password.
    cy.get('[data-testid=login-error-alert]')
      .should('exist')
      .should('have.text', 'Password is required');
  });

  it('should allow user to logout', () => {
    cy.login();

    cy.get('#logout-button')
      .should('exist')
      .should('have.attr', 'type', 'button')
      .should('have.text', 'Logout');

    // Click the logout button.
    cy.get('#logout-button').click();

    // Check if the user is redirected to the login page.
    cy.url().should('contain', '/login');
  });

  it('should redirect unauthorized users to login page at protected paths', () => {
    cy.fixture('config').then(({ protectedPaths }) => {
      Cypress._.each(protectedPaths, (path) => {
        // Visit the protected path.
        cy.goto(path);

        // Check if the user is redirected to the login page.
        cy.url().should('contain', '/login');
      });
    });
  });

});
