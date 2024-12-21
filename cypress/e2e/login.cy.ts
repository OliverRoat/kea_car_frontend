describe('index page', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should render login screen', () => {
    cy.get('[data-testid=login-title]')
      .should('exist')
      .should('have.text', 'Login');
    cy.get('[data-testid=email-login-input] input')
      .should('exist')
      .should('have.value', '')
      .should('have.attr', 'type', 'email');
    cy.get('[data-testid=password-login-input] input')
      .should('exist')
      .should('have.value', '')
      .should('have.attr', 'type', 'password');
    cy.get('[data-testid=login-button]')
      .should('exist')
      .should('have.attr', 'type', 'button')
      .should('have.text', 'Login');
  });

  it('should allow user to login and out', () => {
    cy.get('[data-testid=email-login-input]').type('james@gmail.com');
    cy.get('[data-testid=email-login-input] input').should('have.value', 'james@gmail.com');

    cy.get('[data-testid=password-login-input]').type('12345678');
    cy.get('[data-testid=password-login-input] input').should('have.value', '12345678');

    cy.get('[data-testid=login-button]').click();

    cy.url().should('eq', 'http://localhost:5173/brands');
  });
});