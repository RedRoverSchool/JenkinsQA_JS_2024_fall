/// <reference types="cypress" />

describe('US_13.001 | Create new User', () => {

  let userName = 'Simon';
  const password = 'Password';
  const email = 'user@email.com';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  userName = userName.toLowerCase();


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
    cy.findAllByRole ('button',{ name:/Create User/}).click();
    
    
    cy.contains('a', userName).should('be.visible');  
    cy.contains('User name is already taken').should('not.exist');
    cy.contains("Password didn't match").should('not.exist');
    cy.contains('"null" is prohibited as a full name for security reasons').should('not.exist');

    cy.log('Log UI validation');
    cy.get('[href="/logout"]').should('be.visible');
    cy.get('[href="/logout"] > .hidden-xs').click();

    cy.log('Verifying login page is displayed');
    cy.get('.app-sign-in-register__content-inner').contains('Sign in to Jenkins').should('exist');
    cy.url().should('eq', 'http://localhost:8080/login?from=%2F');

    cy.log(`Logging back in with username: ${userName}`);
    cy.get('#j_username').type(userName);
    cy.get('#j_password').type(password);
    cy.get('button.jenkins-button--primary').click();
    
    cy.log(`Checking that username "${userName}" is visible on the dashboard`);
    cy.contains('a', userName).should('be.visible');  
  })
})
