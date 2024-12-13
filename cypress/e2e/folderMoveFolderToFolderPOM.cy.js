/// <reference types="cypress"/>

import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import FolderPage from "../pageObjects/FolderPage";

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const folderPage = new FolderPage();
const folder1 = 'Folder1';
const folder2 = 'Folder2';

describe('US_04.002 | Folder > Move Folder to Folder', () => {
    beforeEach(() => {

        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(folder1).selectFolder().clickOKButton();
        folderPage.clickSaveButton()
            .clickJenkinsLogo();
        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(folder2).selectFolder().clickOKButton();
        folderPage.clickSaveButton()
            .clickJenkinsLogo();
    });

    it('TC_04.002.03 | Verify that user able to move the folder from drop-down menu of the folder-element on the main page', () => {
        dashboardPage.clickProjectChevronIcon(folder1)
            .clickFolderMoveDropdownOption();
        folderPage.clickFolderMoveDestinationDropdownList(`/${folder2}`)
            .clickMoveButton().clickJenkinsLogo();
        dashboardPage.clickJobTitleLink();
        folderPage.verifyFolderIsVisible();
    })
})
