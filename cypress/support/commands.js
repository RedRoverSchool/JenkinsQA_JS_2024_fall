// ***********************************************
// This example commands.js shows you how to
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
// Cypress.Commands.add('login', (email, password) => { ... })
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
import '@testing-library/cypress/add-commands';
import DashboardPage from '../pageObjects/DashboardPage';
import NewJobPage from '../pageObjects/NewJobPage';

const USERNAME = Cypress.env('local.admin.username');
const PASSWORD = Cypress.env('local.admin.password');
const LOCAL_PORT = Cypress.env('local.port');
const LOCAL_HOST = Cypress.env('local.host');
const dashBoardPage = new DashboardPage();
const newJobPage = new NewJobPage();

Cypress.Commands.add('login',(userName = USERNAME,pass = PASSWORD) => {
    cy.intercept('POST','/j_spring_security_check').as('security_check')

    cy.visit(`http://${LOCAL_HOST}:${LOCAL_PORT}/login`);
    cy.get('#j_username').type(userName);
    cy.get('input[name="j_password"]').type(pass);
    cy.get('button[name="Submit"]').click();
    cy.wait('@security_check')
});

Cypress.Commands.add('createItemByType',(itemName, itemType) => { 
    dashBoardPage.clickNewItemMenuLink();
    newJobPage.clearItemNameField()
            .typeNewItemName(`${itemName}`)
            .getAllItemsList().contains(itemType).click();
    newJobPage.clickOKButton()
            .clickSaveButton();
    let endPoint = itemName.replace(/ /g, '%20');
    cy.url().should('contain', `${endPoint}`);
});