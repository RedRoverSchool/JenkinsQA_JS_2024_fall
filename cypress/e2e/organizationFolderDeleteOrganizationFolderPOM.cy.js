/// <reference types = "cypress" />

import { faker } from '@faker-js/faker';
import DashboardPage from '../pageObjects/DashboardPage';
import NewJobPage from "../pageObjects/NewJobPage";
import OrganizationFolderPage from "../pageObjects/OrganizationFolderPage";

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const organizationFolderPage = new OrganizationFolderPage();
const folderName = faker.commerce.product();

describe('US_06.005 | Organization folder > Delete Organization Folder', () => {
    
    beforeEach(() => {
        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(folderName)
                  .selectOrganizationFolder()
                  .clickOKButton();
        organizationFolderPage.clickSaveButton()
                              .getJobHeadline()
                              .should('contain.text', folderName);
    });

    it('TC_06.005.01 | Delete Organization Folder from a sidebar menu', () => {
        organizationFolderPage.clickSideMenuDeleteLink()
                              .clickOKButton()
                
        organizationFolderPage.getJobHeadline()
                              .should('not.contain.text', folderName);
    });

});