/// <reference types="cypress"/>

import { faker } from "@faker-js/faker";
import genData from "../fixtures/genData"

import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import Header from '../pageObjects/Header';
import FreestyleProjectPage from "../pageObjects/FreestyleProjectPage";
import FolderPage from "../pageObjects/FolderPage";

import newJobPageData from "../fixtures/newJobPageData.json";

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const header = new Header();
const freestyleProjectPage = new FreestyleProjectPage();
const folderPage = new FolderPage();

describe('US_01.006 | FreestyleProject > Move project', () => {
    let project = genData.newProject();
    let folder = genData.newProject();

    it('TC_01.006.06 | Choose from a list of existing folders', () => {
        context('should create 5 folders and verify they exist', () => {
            dashboardPage.clickNewItemMenuLink();
            newJobPage.typeNewItemName(newJobPageData.projectName)
                .selectFreestyleProject()
                .clickOKButton();
            freestyleProjectPage.clickSaveButton();
            header.clickJenkinsLogo();

            for (let i = 1; i <= 5; i++) {
                const uniqueFolderName = `${newJobPageData.folderName} ${i}`;
                dashboardPage.clickNewItemMenuLink();
                newJobPage.typeNewItemName(uniqueFolderName)
                    .selectFolder()
                    .clickOKButton();
                header.clickJenkinsLogo()
                cy.contains(uniqueFolderName).should('exist');
            }
        })

        const randomFolderNumber = faker.number.int({ min: 1, max: 5 });
        const selectedFolder = `${newJobPageData.folderName} ` + randomFolderNumber
        dashboardPage.openProjectPage(newJobPageData.projectName)
        freestyleProjectPage.clickMoveMenuOption()
            .selectNewProjectDestination(`/${selectedFolder}`)
            .clickMoveButton();

        freestyleProjectPage.getProjectInfoSection().should('contain', `Full project name: ${selectedFolder}/${newJobPageData.projectName}`)
    });

    it('TC_01.006.01 | Move project from the Project Page', () => {
        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(project.name)
            .selectFolder()
            .clickOKButton();
        folderPage.clickSaveButton()
            .clickDashboardBreadcrumbsLink();
        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(project.newName)
            .selectFreestyleProject()
            .clickOKButton();
        freestyleProjectPage.clickSaveButton();
        cy.url({ decode: true }).should('include', `/${project.newName}`)
        freestyleProjectPage.clickMoveMenuOption()
            .selectNewProjectDestination(`/${project.name}`)
            .clickMoveButton();

        cy.url({ decode: true }).should('include', `/job/${project.name}/job/${project.newName}`);
    });

    it("RF_01.006.07 Verify user is able to move a project from the Project Page", () => {
        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(project.name)
                  .selectFreestyleProject()
                  .clickOKButton();
        freestyleProjectPage.clickSaveButton();
        header.clickJenkinsLogo();
    
        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(folder.name)
                  .selectFolder()
                  .clickOKButton();
        freestyleProjectPage.clickSaveButton();
        header.clickJenkinsLogo();    
    
        dashboardPage.openProjectPage(project.name);
        freestyleProjectPage.clickMoveMenuOption()
                            .selectNewProjectDestination(`Jenkins » ${folder.name}`)
                            .clickMoveButton();
        header.clickJenkinsLogo();

        dashboardPage.openProjectPage(folder.name);
        folderPage.getItemName()
            .contains(project.name)
            .should('be.visible');
    });

    it('TC_01.006.05 | Move project from the Dashboard to Folder', () => {
        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(project.name)
                  .selectFreestyleProject()
                  .clickOKButton();

        freestyleProjectPage.clickSaveButton();
        header.clickJenkinsLogo();

        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(project.folderName)
                  .selectFolder()
                  .clickOKButton();
        header.clickJenkinsLogo();

        dashboardPage.openDropdownForItem(project.name)
                     .clickMoveTheProjectButton();
        freestyleProjectPage.clickMoveMenuOption()
                            .selectNewProjectDestination(`/${project.folderName}`)
                            .clickMoveButton()
                            .clickJenkinsLogo();
        dashboardPage.openProjectPage(project.folderName);
        
        folderPage.getItemName().should('have.text',project.name);
    });

    it('TC_01.006.09 | Move a project from a folder to the Dashboard page', () => {

        dashboardPage.clickNewItemMenuOption();
        newJobPage.typeNewItemName(project.name)
            .selectFreestyleProject()
            .clickOKButton();
        freestyleProjectPage.clickSaveButton()
            .clickJenkinsLogo();
        dashboardPage.clickNewItemMenuOption();
        newJobPage.typeNewItemName(folder.name)
            .selectFolder()
            .clickOKButton();
        freestyleProjectPage.clickSaveButton()
            .clickDashboardBreadcrumbsLink();
        dashboardPage.clickProjectChevronIcon(project.name)
            .clickMoveTheProjectButton();   
        freestyleProjectPage.selectNewProjectDestination(`Jenkins » ${folder.name}`)
            .clickMoveButton()
            .clickDashboardBreadcrumbsLink();

        dashboardPage.clickJobName(folder.name);
        folderPage.clickItemName(project.name);
        freestyleProjectPage.clickMoveMenuOption()
            .selectNewProjectDestination(`Jenkins`)
            .clickMoveButton()
            .clickDashboardBreadcrumbsLink();

        dashboardPage.getJobTitleLink().contains(project.name)
            .should('have.text', project.name).and('be.visible');
    })

    it('TC_01.006.10 | Verify a project is moved to an existing folder from the Project page', () => {

        cy.log('Creating a Freestyle project');
        dashboardPage.clickCreateJobLink();
        newJobPage.typeNewItemName(project.name)
                  .selectFreestyleProject()
                  .clickOKButton();
        freestyleProjectPage.clickSaveButton();
        header.clickJenkinsLogo();
    
        cy.log('Creating a Folder');
        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(project.folderName)
                  .selectFolder()
                  .clickOKButton();
        folderPage.clickSaveButton();
        header.clickJenkinsLogo();

        cy.log('Moving the Freestyle project into the Folder');
        dashboardPage.openProjectPage(project.name);
        cy.url({ decode: true }).should('include', project.name);
        freestyleProjectPage.clickMoveMenuOption()
                            .selectNewProjectDestination(`/${project.folderName}`)
                            .clickMoveButton();
        header.clickJenkinsLogo();
    
        cy.log('Verifying that the project was moved to the folder');
        dashboardPage.openProjectPage(project.folderName);
        folderPage.getItemName().should('contain.text', project.name).and('be.visible');
    });
    
});
