/// <reference types="cypress" />

import DashboardPage from '../pageObjects/DashboardPage';
import NewJobPage from '../pageObjects/NewJobPage';
import FreestyleProjectPage from '../pageObjects/FreestyleProjectPage';

import { faker } from '@faker-js/faker';

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const freestyleProjectPage = new FreestyleProjectPage();

describe("US_01.002 | FreestyleProject > Rename Project", () => {
    const initialProjectName = faker.lorem.words(); 
    const renamedProjectName = faker.lorem.words();
    
    it('TC-01.002.06| Rename a project name from the Dashboard page', () => {
        
        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(initialProjectName).selectFreestyleProject();
        newJobPage.clickOKButton();
        freestyleProjectPage.clickSaveButton().clickDashboardBreadcrumbsLink();

        dashboardPage.clickJobTableDropdownChevron().clickRenameProjectDropdownMenuItem();
        freestyleProjectPage.getRenameField().click();
        freestyleProjectPage.clearRenameField().typeRenameField(renamedProjectName);
        freestyleProjectPage.clickRenameButton();
        freestyleProjectPage.getPageHeadline().should('have.text', renamedProjectName);
   })
})