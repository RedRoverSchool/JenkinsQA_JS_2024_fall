/// <reference types="cypress"/>

import DashboardPage from '../pageObjects/DashboardPage';
import NewJobPage from '../pageObjects/NewJobPage';
import Header from '../pageObjects/Header';
import { newInstance } from '../fixtures/newJobPageData.json';

const dashBoardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const header = new Header();

describe('US_08.001 | Build history > Start to build a project', () => {

    newInstance.filter(item => item !== 'Folder' && item !== 'Organization Folder' && item != 'Multibranch Pipeline')
               .forEach((item, i) => {
                     it(`TC_08.001.01 | Verify build status icon for "Not built" ${item} is shown on "Dashboard" page`, () => {
                        dashBoardPage.clickNewItemMenuLink();
                        newJobPage.clearItemNameField()
                                .typeNewItemName(`New ${item}`)
                                .getAllItemsList().contains(item).click()
                        newJobPage.clickOKButton()
                                .clickSaveButton()
                        header.clickDashboardBtn();

                        dashBoardPage.getAllIconsProjectRow(item).eq(0)
                                     .should('have.attr', 'tooltip', 'Not built')
                                     .and('be.visible');
        });
    });
    
});