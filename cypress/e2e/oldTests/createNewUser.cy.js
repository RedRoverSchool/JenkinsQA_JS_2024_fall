/// <reference types="cypress" />

describe('US_13.001 | Create new User', () => {

  const userName = 'userName';
  const password = 'Password';
  const email = 'user@email.com';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  it('TC_13.001.01 | Create new User via Manage Jenkins left side menu', () => {

    expect(email).to.match(emailRegex, 'The email is in a valid format');

    cy.get('a[href="/manage"]').click();
    cy.url().should('include', '/manage');
    cy.get('a[href="securityRealm/"]').click();
    cy.url().should('include', '/securityRealm');
    cy.get('a[href="addUser"]').click();
    cy.url().should('include', '/addUser');
    cy.get('#username').should('be.visible').and('be.enabled').type(userName);
    cy.get('input[name="password1"]').should('be.visible').and('be.enabled').type(password);
    cy.get('input[name="password2"]').type(password);
    cy.get('input[name="email"]').type(email);
    cy.get('[name="Submit"]').click({forse:true});

    cy.contains('User name is already taken').should('not.exist');
    cy.contains("Password didn't match").should('not.exist');
  })


})
