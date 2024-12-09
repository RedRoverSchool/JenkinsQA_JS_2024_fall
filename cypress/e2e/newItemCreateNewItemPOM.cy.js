/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

import Header from "../pageObjects/Header";
import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import FreestyleProjectPage from '../pageObjects/FreestyleProjectPage';
import PipelinePage from '../pageObjects/PipelinePage';

import allKeys from "../fixtures/newJobPageData.json";
import {newItem} from "../fixtures/messages.json";

const header = new Header();
const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const freestyleProjectPage = new FreestyleProjectPage();
const pipelinePage = new PipelinePage();

const { projectName, projectNameInvalid, errorMessageColor } = allKeys;

describe("US_00.000 | New Item > Create New item", () => {

    const randomItemName = faker.lorem.words();
    const newRandomItemName = faker.lorem.words();
    const wrongJobName = 'Item#1';

    it('TC_00.000.01| Create new item from "Create a job" button| Invalid data', () => {
        dashboardPage.clickNewItemMenuLink();

        newJobPage.typeNewItemName("<")
            .getUnsaveItemInvalidName().should("be.visible")
            .and("have.class", "input-validation-message")
            .contains(newItem.newItemNameInvalidMessage);

        newJobPage.clearItemNameField()
            .getEmptyItemInvalidName().should("be.visible")
            .and("have.class", "input-validation-message")
            .contains(newItem.emptyNameFieldReminder);
    });

    it('TC_00.000.02 | Create new item from "Create a job" button', () => {

        dashboardPage
            .getMainPanel().contains(randomItemName).should('not.exist')
            .then(() => {
                dashboardPage.clickNewItemMenuLink();
            });
        newJobPage
            .typeNewItemName(randomItemName)
            .selectFreestyleProject()
            .clickOKButton();
        header
            .clickJenkinsLogo();
        dashboardPage
            .getJobTable().contains(randomItemName).should('exist');
    });

    it('TC_00.000.03 | Create New item | From the "New Item" link in the left sidebar', () => {
        dashboardPage.clickNewItemMenuLink()

        newJobPage.typeNewItemName(randomItemName)
            .selectFreestyleProject()
            .clickOKButton()
        freestyleProjectPage.clickSaveButton()
        freestyleProjectPage.getJobHeadline()
            .should('contain', randomItemName).and('exist');
    });

    it('TC_00.000.05 | Create new item from Dashboard dropdown menu', () => {

        dashboardPage.hoverDashboardDropdownChevron()
                     .clickDashboardDropdownChevron()
                     .selectNewItemFromDashboardChevron();
        newJobPage.typeNewItemName(randomItemName)
                  .selectFreestyleProject()
                  .clickOKButton();
        header.clickJenkinsLogo();

        dashboardPage.getJobTable().contains(randomItemName).should('be.visible');
    })

    it('TC_00.000.06 | Create new item from the "New Item" link in the left sidebar', () => {

        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(randomItemName)
                  .selectFreestyleProject()
                  .clickOKButton();
        header.clickJenkinsLogo();

        dashboardPage.getJobTable().contains(randomItemName)
                     .should('be.visible').and('have.text', randomItemName);
    })

    it('TC_00.000.07 | Verify new item can only be created using unique item names', () => {

        cy.log('Creating the 1st Item');
        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(randomItemName)
                  .selectFreestyleProject()
                  .clickOKButton();
        header.clickJenkinsLogo();
        cy.log('Attempting to create the 2nd Item with the previously used name');
        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(randomItemName)
                  .getItemNameInvalidErrorMessage()
                  .should('contain.text', `${newItem.duplicateNotAllowedMessage} ‘${randomItemName}’`);
        newJobPage.clearItemNameField()
                  .typeNewItemName(newRandomItemName)
                  .selectFreestyleProject()
                  .clickOKButton();
        header.clickJenkinsLogo();
        
        cy.log('Verifying that new item with unique name was created');
        dashboardPage.getJobTable().contains(newRandomItemName)
                     .should('be.visible').and('have.text', newRandomItemName);
    })

    it('TC_00.000.08 | Verify item name does not contain any special characters', () => {

        cy.log('Attempting to create New Item containing special characters in its name');
        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(projectNameInvalid)
                  .getItemNameInvalidErrorMessage().should('have.text', newItem.newItemNameInvalidMessage);
        cy.log('Creating New Item');
        newJobPage.clearItemNameField()
                  .typeNewItemName(projectName)
                  .selectFreestyleProject()
                  .clickOKButton();
        header.clickJenkinsLogo();
        
        cy.log('Verifying that new item was created, not containing any special characters in its name');
        dashboardPage.getJobTable().should('contain.text', projectName).and('be.visible');
        dashboardPage.getJobTable().contains(projectName).then(($item) => {
            let itemName = $item.text();
            cy.wrap(itemName).should('not.match', /[!@#$%^&*[\]\/\\|;:<>,?]/);
        })
    })

    it('TC_00.000.09 | Verify New item can be created from "Create a job" button', () => {

        dashboardPage.clickNewItemMenuLink()
        newJobPage
           .typeNewItemName(randomItemName)
           .selectFreestyleProject()
           .clickOKButton()
        freestyleProjectPage.clickSaveButton()
           .clickDashboardBreadcrumbsLink()

       dashboardPage.getJobTable().contains(randomItemName).should('exist')
    });

    it('TC_00.000.10 | Verify that to create a new item, user should choose "an item type" first', () => {

        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(randomItemName)
                  .getOKButton().should('be.disabled');
        newJobPage.selectFreestyleProject()
                  .getOKButton().should('be.enabled');
        newJobPage.clickOKButton();
        header.clickJenkinsLogo();
                  
        dashboardPage.getJobTable().should('contain.text', randomItemName).and('be.visible');
    })

    it('TC_00.000.12 | Verify redirection to the configure page for the selected item type after clicking "OK"', () => {

        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(randomItemName)
                  .selectPipelineProject()
                  .clickOKButton();

        newJobPage.getUrlConfigurePageField().should('include', '/configure');
        pipelinePage.getPipelineMenuOption().should('be.visible');
    })

    it('TC_00.000.13 | Verify that after saving, new item is present on dashboard', () => {

        dashboardPage.clickNewItemMenuLink()
        newJobPage.typeNewItemName(randomItemName)
                     .selectFreestyleProject()
                     .clickOKButton()
        freestyleProjectPage.clickSaveButton()
                           .clickJenkinsLogo();

        dashboardPage.getJobTable().should('contain.text', randomItemName).and('be.visible');
    })

    it('TC_00.000.14 | Verify the display of validation message if no item name is entered', () => {

        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(randomItemName)
                  .clearItemNameField();

        newJobPage.getEmptyItemInvalidName()
                  .should('contain.text', newItem.emptyNameFieldReminder)
                  .and('have.css', 'color', errorMessageColor);
    })

    it('TC_00.000.18 | Create New item from the "New Item" link in the left sidebar.', () => {
        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(randomItemName)
                  .selectFreestyleProject()
                  .clickOKButton();
        header.clickJenkinsLogo();

        cy.log('Verifying that new item was created');
        dashboardPage.getJobTable().should('contain.text', randomItemName).and('be.visible');
    })
});