/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

import DashboardPage from '../pageObjects/DashboardPage';  
import NewJobPage from '../pageObjects/NewJobPage';
import FreestyleProjectPage from '../pageObjects/FreestyleProjectPage';

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const freestyleProjectPage = new FreestyleProjectPage();

const folderName = faker.commerce.product();
  
describe('US_00.001 | New item > Create Freestyle Project', function () {
    
    it('TC_00.001.19 | New freestyle project is created if user enter projects name, choose project type and save it', () => {

        dashboardPage.clickNewItemMenuLink();
        newJobPage.addNewProjectName(folderName)
                  .selectFreestyleProject()
                  .clickOKButton();
        freestyleProjectPage.clickSaveButton();

        cy.url().should('include', folderName);
        freestyleProjectPage.getJobHeadline()
                            .should('be.visible')
                            .and('have.text', folderName);
              
    });
    
});