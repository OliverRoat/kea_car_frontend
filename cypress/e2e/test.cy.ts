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
    cy.get('[data-testid=email-login-input]').type('hans@gmail.com');
    cy.get('[data-testid=email-login-input] input').should('have.value', 'hans@gmail.com');

    cy.get('[data-testid=password-login-input]').type('hans123');
    cy.get('[data-testid=password-login-input] input').should('have.value', 'hans123');

    cy.intercept('POST', 'http://localhost:8000/mysql/login').as('loginRequest');
    cy.get('[data-testid=login-button]').click();

    cy.wait('@loginRequest').then((interception) => {
      if (interception.response) {
        cy.log('Login response:', interception.response.body);
        assert.isNotNull(interception.response.body, 'Login API call has data');
      } else {
        cy.log('Interception details:', interception);
        assert.fail('Login API call did not receive a response');
      }
    });

    cy.window().then((win) => {
      const token = win.sessionStorage.getItem('access_token');
      cy.log('Access token:', token);
      expect(token).to.not.be.null;
    });

    cy.url().should('eq', 'http://localhost:5173/brands');
  });
});