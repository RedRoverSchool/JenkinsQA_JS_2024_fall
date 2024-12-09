/// <reference types="cypress" />

describe('US_13.001 | Create new User', () => {

  const userName = 'UserName';
  const password = 'Password';
  const email = 'test@mail.com';

  it('TC_13.001.01 | Create new User via Manage Jenkins left side menu', () => {
    cy.get('a[href="/manage"]').click();
    cy.get('a[href="securityRealm/"]').click();
    cy.get('a[href="addUser"]').click();
    cy.get('#username').type(userName);
    cy.get('input[name="password1"]').should('be.visible').type(password);
    cy.get('input[name="password2"]').type(password);
    cy.get('input[name="email"]').type(email);
    cy.get('.jenkins-button').eq("0").click({forse:true});
  })


})
