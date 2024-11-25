/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import allKeys from "../fixtures/pomFixtures/newJobPage.json"
import {newItem} from "../fixtures/messages.json"

const {projectNameInvalid, errorMessageColor} = allKeys;
const projectNameFaker = faker.commerce.productName();
const btnNewItem = 'a[href$="/newJob"]';
const btnSave = '.jenkins-submit-button'; 
const btnOK = '[id="ok-button"]';
const inputItemName = '[name="name"]';
const pipelineType = '.org_jenkinsci_plugins_workflow_job_WorkflowJob';
const dashboardLink = 'a[href="/"]';
const projectNamePlace = `[id='job_${projectNameFaker}']`;
const tableOfProjects= '[id="projectstatus"]';

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();

describe("US_00.002 | New Item > Create Pipeline Project", () => {


  let projectName = "New Pipeline"


  it("TC_00.002.01 | Special characters are not allowed in the project name", () => {
    dashboardPage
      .clickNewItemMenuLink()
      .addNewProjName(projectNameInvalid)
    newJobPage.getItemNameInvalidErrorMessage()
      .should("have.text", newItem.newItemNameInvalidMessage)
      .and("have.css", "color", errorMessageColor);
  });

  it('TC_00.002.04 | Create Pipeline Project with an empty item name field', () => {
    cy.get('span').contains("New Item").click();
    cy.get('.label').contains('Pipeline').click();

    cy.get('#itemname-required').should('have.text', '» This field cannot be empty, please enter a valid name')
      .should('have.css', 'color', 'rgb(230, 0, 31)');
  })


  it("TC_00.002.03 | Verify redirection to Configure page", () => {

    cy.get('a[href$="/newJob"]').click();
    cy.get('input#name').type(projectName);
    cy.get('#items li[class$="WorkflowJob"]').click();
    cy.get('button[id="ok-button"]').click();
        
    cy.url().should('include', '/configure')

  })

  it('TC_00.002.05 | Create Pipeline Project with an already existing name of a project', () => {
    cy.log('Precondition: create Pipline project');
    cy.get('span').contains("New Item").click();
    cy.get('input[name="name"]').type(projectName).click();
    cy.get('.label').contains('Pipeline').click();
    cy.get('#ok-button').click();
    cy.get('button').contains('Save').click();
    cy.get('a').contains("Dashboard").click();

    cy.log('Create project with an existing name');
    cy.get('span').contains("New Item").click();
    cy.get('input[name="name"]').type(projectName).click;

    cy.get('#itemname-invalid').should('have.text', `» A job already exists with the name ‘${projectName}’`)
        .and('have.css', 'color', 'rgb(230, 0, 31)');
    cy.get('#ok-button').should('be.disabled');
})

  it('TC_00.002.14 | Create Pipeline Project', () => {
    cy.get(btnNewItem).click();
    cy.get(inputItemName).type(projectNameFaker);
    cy.get(pipelineType).click();
    cy.get(btnOK).click();
    cy.get(btnSave).click();
    cy.get(dashboardLink).contains("Dashboard").click();

    cy.get(projectNamePlace).should('contain.text', projectNameFaker).and('be.visible');
    cy.get(tableOfProjects).should('contain.text', projectNameFaker).and('be.visible');
  });
});