/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', () => {
    cy.fixture('config').then(({ baseURL }) => {
        cy.fixture('user').then(({ email, password }) => {
            // Load the login page.
            cy.visit(`${baseURL}/login`);

            // Fill in the email information.
            cy.get('[data-testid=email-login-input]').type(email);
            cy.get('[data-testid=email-login-input] input').should('have.value', email);

            // Fill in the password information.
            cy.get('[data-testid=password-login-input]').type(password);
            cy.get('[data-testid=password-login-input] input').should('have.value', password);

            // Click the login button.
            cy.get('[data-testid=login-button]').click();

            // Verify that the user is redirected to the brands page
            // which requires authentication.
            cy.url().should('eq', `${baseURL}/brands`);
        });
    });
})

Cypress.Commands.add('logout', () => {
    cy.fixture('config').then(({ baseURL }) => {
        cy.visit(`${baseURL}/brands`);

        cy.get('#logout-button')
            .should('exist')
            .should('have.attr', 'type', 'button')
            .should('have.text', 'Logout');

        // Click the logout button.
        cy.get('#logout-button').click();

        // Check if the user is redirected to the login page.
        cy.url().should('eq', `${baseURL}/login`);
    });
})

Cypress.Commands.add('goto', (path) => {
    cy.fixture('config').then(({ baseURL }) => {
        cy.visit(`${baseURL}${path}`);
    });
})

Cypress.Commands.add('locationEq', (path) => {
    cy.fixture('config').then(({ baseURL }) => {
        cy.url().should('eq', `${baseURL}${path}`);
    });
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }