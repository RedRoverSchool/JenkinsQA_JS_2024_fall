/// <reference types="cypress"/>

import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import FolderPage from "../pageObjects/FolderPage";
import Header from "../pageObjects/Header";

import genData from "../fixtures/genData";

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const folderPage = new FolderPage();
const header = new Header();
const folderName = genData.newProject();

describe('US_04.001 | Folder > Rename Folder', () => {

    beforeEach(() => {
        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(folderName.name).selectFolder().clickOKButton()
        folderPage.clickSaveBtn()
        header.clickJenkinsLogo();
    });

    it('TC_04.001.02 | Rename folder from drop-down menu', () => {
        
        let newFolderName = genData.newProject();

        dashboardPage.openDropdownForProject(folderName.name)
            .clickRenameFolderDropdownMenuItem()
        folderPage.clearNewNameField()
            .typeNewFolderName(newFolderName.name)
            .clickSaveBtn()
        folderPage.verifyFolderUrl(newFolderName.name)

        folderPage.getFolderNameOnMainPanel()
            .should('include.text', `${newFolderName.name}`)
    });
});
