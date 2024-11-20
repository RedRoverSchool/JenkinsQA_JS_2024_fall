/// <reference types="cypress" />

describe('US_14.003 | Header > Click Log out', () => {

  it('Should log out', () => {
    cy.get('a[href="/logout"]').click();
    cy.get('.app-sign-in-register__content-inner').contains('Sign in to Jenkins');
    cy.getCookies();

  });


});



