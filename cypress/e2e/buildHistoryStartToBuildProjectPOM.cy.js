/// <reference types="cypress"/>

import DashboardPage from '../pageObjects/DashboardPage';
import NewJobPage from '../pageObjects/NewJobPage';
import Header from '../pageObjects/Header';
import { newInstance } from '../fixtures/newJobPageData.json';

const dashBoardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const header = new Header();

describe('US_08.001 | Build history > Start to build a project', () => {
        function createItemByType(itemsType, itemsName) {
                dashBoardPage.clickNewItemMenuLink();
                newJobPage.clearItemNameField()
                        .typeNewItemName(`${itemsName}`)
                        .getAllItemsList().contains(itemsType).click()
                newJobPage.clickOKButton()
                        .clickSaveButton()
                header.clickDashboardBtn();
        }
        const itemsForBuilding = newInstance.filter(itemsType => 
                itemsType !== 'Folder' && 
                itemsType !== 'Organization Folder' && 
                itemsType !== 'Multibranch Pipeline');
        
        itemsForBuilding.forEach(item => {
                it(`TC_08.001.01 | Build status icon for "Not built" ${item} is shown on "Dashboard" page`, () => {
                        createItemByType(item, `New ${item}`);
                        dashBoardPage.getAllIconsProjectRow(item).eq(0)
                                .should('have.attr', 'tooltip', 'Not built')
                                .and('be.visible');
                });
        });

        itemsForBuilding.forEach(item => {
                it(`TC_08.001.02 | The build is triggered from the ${item}'s dropdown menu`, () => {
                        createItemByType(item, `New ${item}`);
                        dashBoardPage.openDropdownForItem(`New ${item}`)
                                .clickBuildNowDropdownMenuItem()
                                .getNotificationBar()
                                        .should('not.have.class', 'jenkins-notification--hidden')
                                        .and('contain.text', 'Build Now: Done.');

                        dashBoardPage.clickItemName(`New ${item}`)
                        dashBoardPage.getBuildHistoryRows()
                                .should('have.length', 1)
                                .contains('1')
                                .should('be.visible');
                });
        });

        itemsForBuilding.forEach(item => {
                it(`TC_08.001.04 | Dashboard page displays information about the latest build for ${item}`, () => {
                        
                        cy.log('Create item');
                        createItemByType(item, `New ${item}`);
                        dashBoardPage.clickItemName(`New ${item}`);

                        cy.log('Start the first build and verify the build appeared in the build history.');
                        dashBoardPage.clickBuildNowMenuOption()
                                .getBuildHistoryRows()
                                        .should('have.length.greaterThan', 0)
                                        .and('be.visible');
                        
                        cy.log('Start the second build and receive from the build history his number.');
                        dashBoardPage.clickBuildNowMenuOption()
                                .getBuildHistoryRows()
                                        .should('have.length.greaterThan', 1)
                                        .then(($rows) => {
                                                const lastBuildNumber = $rows[0].innerText.split('\n');
                                                return lastBuildNumber[0];
                                        }).then((res) => {
                                                cy.log("Go to the Dashboard Page and verify the build number next to items name matches the last build number");
                                                dashBoardPage.clickDashboardBtn();
                                                cy.get(`tr[id='job_New ${item}']`).should('contain', res);
                                        });        
                });
        });
    
});