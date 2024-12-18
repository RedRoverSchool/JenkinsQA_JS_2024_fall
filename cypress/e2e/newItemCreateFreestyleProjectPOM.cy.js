/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

import DashboardPage from '../pageObjects/DashboardPage';
import NewJobPage from '../pageObjects/NewJobPage';
import FreestyleProjectPage from '../pageObjects/FreestyleProjectPage';
import Header from '../pageObjects/Header';
import FolderPage from '../pageObjects/FolderPage';
import BasePage from '../pageObjects/basePage';
import UserPage from '../pageObjects/UserPage';

import { newItem } from '../fixtures/messages.json'
import genData from "../fixtures/genData.js";
import message from "../fixtures/messages.json"
import newJobPageData from "../fixtures/newJobPageData.json";


const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const freestyleProjectPage = new FreestyleProjectPage();
const header = new Header();
const folderPage = new FolderPage();
const basePage = new BasePage();
const userPage = new UserPage();

const folderName = faker.commerce.product();

const LOCAL_PORT = Cypress.env("local.port");
const LOCAL_HOST = Cypress.env("local.host");
const USERNAME = Cypress.env('local.admin.username');

describe('US_00.001 | New item > Create Freestyle Project', function () {

    let project = genData.newProject();

    it('TC_00.001.19 | New freestyle project is created if user enter projects name, choose project type and save it', () => {

        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(folderName)
            .selectFreestyleProject()
            .clickOKButton();
        freestyleProjectPage.clickSaveButton();

        cy.url().should('include', folderName);
        freestyleProjectPage.getJobHeadline()
            .should('be.visible')
            .and('have.text', folderName);

    });

    it('TC_00.001.10 | Create Freestyle Project using the "New Item" button', () => {
        
        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(folderName)
            .selectFreestyleProject()
            .clickOKButton();

        freestyleProjectPage.clickSaveButton();
        header.clickJenkinsLogo();

        dashboardPage.getItemName().should('contain', folderName);

    });

    it('TC_00.001.13 | Verify that duplicate names are not allowed during project creation', () => {
        
        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(folderName)
            .selectFreestyleProject()
            .clickOKButton();
        freestyleProjectPage.clickSaveButton();
        header.clickDashboardBtn();
   
        dashboardPage.clickNewItemMenuLink();

        newJobPage.typeNewItemName(folderName)
            .getItemNameInvalidErrorMessage()
                .should('contain.text', `${newItem.duplicateNotAllowedMessage} ‘${folderName}’`);
        
        newJobPage.getOKButton().should('be.disabled');

    });

    it("TC_00.001.11 | Create Freestyle Project by clicking on Create a Job", function () {
        dashboardPage.clickCreateJobLink();
        newJobPage
            .typeNewItemName(project.name)
            .selectFreestyleProject()
            .clickOKButton()
            .clickSaveButton();

        freestyleProjectPage
            .getJobHeadline()
            .should("be.visible")
            .and("have.text", project.name);
    });
  
    it('TC_00.001.07 | Verify that duplicate names are not accepted during project creation', function () {
        
        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(folderName)
                  .chooseRandomItemFromList()
                  .clickOKButton();
        freestyleProjectPage.clickSaveButton()
                            .clickDashboardBreadcrumbsLink();
        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(folderName)
                  .selectFreestyleProject();
        
        newJobPage.getItemNameInvalidErrorMessage()
                  .should('have.text', `${newItem.duplicateNotAllowedMessage} ‘${folderName}’`);
                  
        newJobPage.getOKButton()
                  .should('be.disabled')
                  .and('be.visible');
    });

    it('TC_00.001.03 | Create a new Freestyle Project using the "New Item" button from the Dashboard', function () {
        dashboardPage.clickNewItemMenuLink();
        newJobPage
            .typeNewItemName(project.name)
            .selectFreestyleProject()
            .clickOKButton()
            .clickSaveButton();
        freestyleProjectPage.getJobHeadline().should("have.text", project.name);
        freestyleProjectPage.getBreadcrumbBar().should('contain', project.name);
    });

    it('TC_00.001.14 | Create Freestyle Project from the Dashboard Menu', function () {

        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(project.name)
                  .selectFreestyleProject()
                  .clickOKButton()
                  .clickSaveButton();
        freestyleProjectPage.getJobHeadline().should("have.text", project.name);
    });

    it('TC_00.001.02 | Verify a new freestyle project can be created from the Dahsboard page', function () {

        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(project.name)
                  .selectFreestyleProject()
                  .clickOKButton();
        freestyleProjectPage.clickSaveButton();

        freestyleProjectPage.getJobHeadline()
                            .should('have.text', project.name);
    
    });

    it('TC_00.001.04 | Verify a friendly reminder appeared when attempting to create a new Freestyle Project without a name', function () {

        dashboardPage.clickNewItemMenuLink();
        newJobPage.selectFreestyleProject();
        
        newJobPage.getEmptyNameFieldReminder()
                  .should('have.text', message.newItem.emptyNameFieldReminder);

    });

    it('TC_00.001.05 | Verify a description can be added when creating a new Freestyle Project', function () {
        
        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(project.name)
                  .selectFreestyleProject()
                  .clickOKButton();
        freestyleProjectPage.typeJobDescription(project.description)
                            .clickSaveButton();

        freestyleProjectPage.getJobDescription()
                            .should('have.text', project.description);

    });

    it('TC_00.001.06 | Verify a new Freestyle Project can be created from a new Folder', function () {
        
        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(project.folderName)
                  .selectFolder()
                  .clickOKButton();
        folderPage.clickSaveButton()
                  .clickCreateAJobLink();
        newJobPage.typeNewItemName(project.name)
                  .selectFreestyleProject()
                  .clickOKButton();
        freestyleProjectPage.clickSaveButton();

        freestyleProjectPage.getJobHeadline()
                            .should('have.text', project.name);
        freestyleProjectPage.getProjectInfoSection()
                            .should('include.text', `${project.folderName}/${project.name}`);

    });

    it('TC_00.001.22| New Item > Verify Project Description size ', () => {
        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(project.name)
                  .selectFreestyleProject()

        newJobPage.getFreestyleProjectDescriptionSize().should('have.css', 'font-size', '14px');
    });

    it('TC_00.001.23 | Create freestyleProject via API', () => {
        cy.log('step1: generate API token:');
        header.clickUserName();
        basePage.clickConfigureLMenuOption();
        userPage.generateNewApiToken(project.tokenName).then((tokenValue) => {
            cy.log('Generated Token:', tokenValue);
    
            cy.log('step2: get Crumb');
            cy.request({
                method: 'GET',
                url: `http://${LOCAL_HOST}:${LOCAL_PORT}${newJobPageData.getCrumbEndpoint}`, 
                auth: {
                    username: USERNAME,
                    password: tokenValue,
                }
            }).then((response) => {
                const crumb = response.body.crumb; 
                cy.log('Crumb:', crumb)
    
                cy.log('step3: create project');
                cy.request({
                    method: 'POST',
                    url: `http://${LOCAL_HOST}:${LOCAL_PORT}${newJobPageData.createNewItemEndpoint}${project.name}`,
                    headers: {
                        'Jenkins-Crumb': crumb,
                        'Content-Type': 'application/xml',
                    },
                    auth: {
                        username: USERNAME,
                        password: tokenValue,
                    },
                    body: newJobPageData.simpleProjectXml,
                    failOnStatusCode: false,
                    
                }).then((response) => {
                    console.log(response.body)
                    expect(response.status).to.eq(200);
                });
            });

            cy.log('step 4: delete API token:')
            userPage.getDeleteApiTokenButton().last().click()
            userPage.clickConfirmDeleteApiTokenButton();
            
            cy.log('step 5: verify created project on the dashboard:')
            header.clickDashboardBreadcrumbsLink();
            dashboardPage.getItemName().should('contain', project.name);

        });
    });
})
