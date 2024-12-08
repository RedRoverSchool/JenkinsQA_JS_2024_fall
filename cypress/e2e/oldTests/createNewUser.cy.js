/// <reference types="cypress" />

describe('TC_13.001.01 | Create new User', () => {

  const userName = 'UserName';
  const password = 'Password';
  const email = 'test@mail.com';

  it('TC_13.001.01 | Create new User via Manage Jenkins left side menu', () => {
    cy.get('a[href="/manage"]').click();
    cy.get('a[href="securityRealm/"]').click();
    cy.get('a[href="addUser"]').click();
    cy.get('#username').type(userName);
    cy.get('.setting-main').eq("1").type(password);
    cy.get('.setting-main').eq("2").type(password);
    cy.get('.setting-main').eq("4").type(email);
    cy.get('.jenkins-button').eq("0").click({forse:true});
  })


})
