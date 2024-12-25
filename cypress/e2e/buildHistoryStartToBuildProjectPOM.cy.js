/// <reference types="cypress"/>

import DashboardPage from '../pageObjects/DashboardPage';
import NewJobPage from '../pageObjects/NewJobPage';
import Header from '../pageObjects/Header';
import BasePage from '../pageObjects/basePage';
import UserPage from '../pageObjects/UserPage';
import FreestyleProjectPage from '../pageObjects/FreestyleProjectPage';

import genData from "../fixtures/genData.js";
import { newInstance } from '../fixtures/newJobPageData.json';
import newJobPageData from "../fixtures/newJobPageData.json";

const dashBoardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const header = new Header();
const basePage = new BasePage();
const userPage = new UserPage();
const freestyleProjectPage = new FreestyleProjectPage();

const LOCAL_PORT = Cypress.env("local.port");
const LOCAL_HOST = Cypress.env("local.host");
const USERNAME = Cypress.env('local.admin.username');

describe('US_08.001 | Build history > Start to build a project', () => {

    let project = genData.newProject();
        
        const itemsForBuilding = newInstance.filter(itemType => 
                itemType !== 'Folder' && 
                itemType !== 'Organization Folder' && 
                itemType !== 'Multibranch Pipeline');
        
        itemsForBuilding.forEach(item => {
                it(`TC_08.001.01 | Build status icon for "Not built" ${item} is shown on "Dashboard" page`, () => {
                        
                        cy.createItemByType(`New ${item}`, item);
                        header.clickDashboardBtn();
                        dashBoardPage.getAllIconsProjectRow(item).eq(0)
                                .should('have.attr', 'tooltip', 'Not built')
                                .and('be.visible');
                });
        });

        itemsForBuilding.forEach(item => {
                it.skip(`TC_08.001.02 | The build is triggered from the ${item}'s dropdown menu`, () => {
                        
                        cy.createItemByType(`New ${item}`, item);
                        header.clickDashboardBtn();
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
                it.skip(`TC_08.001.04 | Dashboard page displays information about the latest build for ${item}`, () => {
                        
                        cy.log('Create item');
                        cy.createItemByType(`New ${item}`, item);
                        header.clickDashboardBtn();

                        cy.log('Start the first build and verify the build appeared in the build history.');
                        dashBoardPage.clickItemName(`New ${item}`)
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

        it.skip('TC_08.001.05 | API Trigger a new build of created freestyleProject via API', () => {
            
            cy.log('Preconditions: A new Jenkisn FreestyleProject is created')
            dashBoardPage.clickCreateJobLink()
            newJobPage
                .typeNewItemName(project.name)
                .selectFreestyleProject()
                .clickOKButton()
                .clickSaveButton()
            
            cy.log('__Step 1: generate API token:__')
            header.clickUserName()
            basePage.clickConfigureLMenuOption()
            userPage.generateNewApiToken(project.tokenName).then((tokenValue) => {
                cy.log(`Generated token_name: ${project.tokenName}, token_value: ${tokenValue}`)
                cy.wrap(tokenValue).as('apiTokenValue')
            })
    
            cy.log('__Step 2: get Crumb__')
            cy.get('@apiTokenValue').then((tokenValue) => {
                cy.request('GET', `http://${LOCAL_HOST}:${LOCAL_PORT}${newJobPageData.getCrumbEndpoint}`, {
                    auth: {
                        username: USERNAME,
                        password: tokenValue,
                    }
                }).then((response) => {
                    let crumb = response.body.crumb; 
                    cy.log(`'Crumb: ${crumb}`)
                    cy.wrap(crumb).as('apiCrumb')
                })
            })
    
            cy.log('__Step 3: configure Project to trigger by API:__')
            userPage.clickDashboardBtn()
            dashBoardPage.clickJobTitleLink()
            freestyleProjectPage.clickConfigureMenuButton()
                                .checkTriggerBuildsRemotelyCheckbox()
                                .typeAuthTokenName(project.tokenName)
                                .clickSaveButton()
    
            cy.log('__Step 4: make API request to trigger build project__');
            cy.get('@apiCrumb').then((crumb) => {
                cy.get('@apiTokenValue').then((tokenValue) => {
                    cy.request({
                        method: 'POST', 
                        url: `http://${LOCAL_HOST}:${LOCAL_PORT}/job/${project.name}/build?token=${project.tokenName}`, 
                        headers: {
                            'Jenkins-Crumb': crumb,
                            'Content-Type': 'application/xml',
                        },
                        auth: {
                            username: USERNAME,
                            password: tokenValue,
                        },
                    })
                        .then((response) => {
                            console.log(response.body)
                            expect(response.status).to.eq(201)
                        });
                })
            })
    
            cy.log('__Step 5: verify the project is triggered__:')
            header.clickDashboardBreadcrumbsLink()
            dashBoardPage.clickJobTitleLink()
            freestyleProjectPage.retrieveBuildNumberAndDate().should('have.length.above', 0)
    
            cy.log('Postconditions: delete API token:')
            header.clickUserName();
            basePage.clickConfigureLMenuOption();
            userPage.getDeleteApiTokenButton().last().click()
            userPage.clickConfirmDeleteApiTokenButton()
        }); 
});