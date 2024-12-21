/// <reference types="cypress"/>

import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import FolderPage from "../pageObjects/FolderPage";
import Header from "../pageObjects/Header";
import genData from "../fixtures/genData";
import configurePageData from "../fixtures/configurePageData.json";

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const folderPage = new FolderPage();
const header = new Header();
const folderName = genData.newProject();
const newFolderName = genData.newProject();
const LOCAL_PORT = Cypress.env('local.port');
const LOCAL_HOST = Cypress.env('local.host');
let endPoint = configurePageData.userStatusEndpoint;
let endPointParams = 'baseName=jenkins.dialogs&_=1734623853681'

describe('US_04.001 | Folder > Rename Folder', () => {

    beforeEach(() => {
        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(folderName.name).selectFolder().clickOKButton();
        folderPage.clickSaveButton()
                  .clickJenkinsLogo();
    });

    it('TC_04.001.02 | Rename folder from drop-down menu', () => {

        dashboardPage.openDropdownForItem(folderName.name)
            .clickRenameDropdownOption();
        folderPage.clearNewNameField()
            .typeNewFolderName(newFolderName.name)
            .clickRenameButton();
        folderPage.verifyFolderUrl(newFolderName.name);

        folderPage.getFolderNameOnMainPanel()
            .should('include.text', `${newFolderName.name}`);
    });

    it('TC_04.001.06 | Successfully enter a valid folder name in the special field', () => {

        dashboardPage.openDropdownForItem(folderName.name)
            .clickRenameDropdownOption()
        folderPage.clearNewNameField()
            .typeNewFolderName(newFolderName.name)
            .getNewNameField().should('have.value', newFolderName.name)
    });

    it('TC_04.001.03| Verify that error message is displayed when an invalid folder name is entered in the Rename Folder field', () => {

        dashboardPage.openDropdownForItem(folderName.name)
            .clickRenameDropdownOption()
        folderPage.clearNewNameField()
            .typeNewFolderName(newFolderName.name +"*")
            .clickRenameButton()

        folderPage.getFolderNameOnMainPanel()
            .should('contain', 'is an unsafe character')
    });

    it('TC_04.001.04 |Verify to rename the folder from drop-down menu of the folder element in the breadcrumbs', () => {
       
        dashboardPage.clickJobName(folderName.name)
        header.getBreadcrumbBar().should('contain', folderName.name)
        header.hoverBreadcrumbsFolderName()
              .getBreadcrumbsFolderDropdownMenu().click()
        dashboardPage.getRenameProjectDropdownMenuItem().click()
        
        folderPage.clearNewNameField()
                 .typeNewFolderName(newFolderName.name)
                 .getNewNameField()
                 .should('have.value', newFolderName.name)
    });

    it.only("TC_04.001.10 | Rename folder from drop-down menu", () => {
        cy.intercept('GET', '**/job/*').as('jobRequest');

        dashboardPage.openDropdownForItem(folderName.name)
            .clickRenameDropdownOption();
        folderPage.clearNewNameField()
            .typeNewFolderName(newFolderName.name)
            .clickRenameButton()
            
        cy.request({
            method: "GET",
            url: `http://${LOCAL_HOST}:${LOCAL_PORT}/${endPoint}?${endPointParams}`,
        }).then((response) => { expect(response.status).to.eq(200) })
        cy.wait('@jobRequest').then(({ request }) => {
            expect(request.url).to.include(`/job/${newFolderName.name}`);
        });

        folderPage.getFolderNameOnMainPanel()
            .should('include.text', `${newFolderName.name}`);
    });

    it('TC_04.001.11 | Rename a folder on the folder page in the Configure section', () => {
        
        dashboardPage.clickItemName(folderName.name);
        folderPage.getFolderNameOnMainPanel().should('include.text', folderName.name);
        folderPage.clickConfigureLMenuOption()
            .typeDisplayName(newFolderName.name)
            .clickSaveButton();

        folderPage.getFolderNameOnMainPanel().should('include.text', newFolderName.name);
        folderPage.clickJenkinsLogo();
        dashboardPage.getItemName().should('contain', newFolderName.name).and('be.visible');
    });

    it('TC_04.001.12 | Verify that there is "Display Name" field and hint sign in the Configure section', () => {
        
        dashboardPage.clickItemName(folderName.name);
        folderPage.clickConfigureLMenuOption();

        folderPage.getDisplayNameField().should('exist').and('be.visible');
        folderPage.getDisplayNameTooltip().should('exist'). and('be.visible');
        
    });
});
