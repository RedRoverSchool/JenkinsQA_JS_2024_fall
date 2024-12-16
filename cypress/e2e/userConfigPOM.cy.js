/// <reference types="cypress"/>

import Header from "../pageObjects/Header";
import UserPage from "../pageObjects/UserPage";
import { faker } from "@faker-js/faker";
import { userDropdownLink } from '../fixtures/dashboardPageData'; 
import BasePage from "../pageObjects/basePage";
import genData from "../fixtures/genData"
import configurePageData from "../fixtures/configurePageData.json";

const userDescription = faker.lorem.paragraph();
const header = new Header();
const userPage = new UserPage();
const basePage = new BasePage();
const LOCAL_PORT = Cypress.env('local.port');
const LOCAL_HOST = Cypress.env('local.host');


describe('US_13.003 | User > Config', () => {
  let name = genData.newProject();
  let endPoint = configurePageData.userStatusEndpoint

    it('TC_13.003.02 | Update Profile Description via Config Menu', () => {
        header.clickUserDropdownLink();
        header.clickUserConfigureItem();
        userPage.clearUserDescription();
        userPage.typeUserDescription(userDescription).invokeTextUserDescription();
        userPage.clickSaveButton();
        userPage.getUserAvatar().should('be.visible');
        userPage.getUserDescription().should('have.text', userDescription);
    })

    it("TC_13.003.01 | Edit the profile description from the account settings page by clicking on your username", () => {
        header.clickUserName();
        userPage
          .clickEditDescriptionBtn()
          .clearUserDescriptionOnStatus()
          .typeUserDescriptionOnStatus(userDescription)
          .clickSaveButton();
        userPage.getUserDescription().should("have.text", userDescription);
      });

    it("TC_13.003.05 | User can access account settings in the dropdown menu next to the username", () => {
      header.clickUserDropdownLink();
      header.getUserDropdownMenu().find('a').should('have.length', userDropdownLink.length);
      userDropdownLink.forEach((item) => {
        header.getUserDropdownMenu().should('include.text', item);
    });

      header.getUserDropdownIcon()
      .should('have.length', userDropdownLink.length)
      .and('be.visible');
  });

   it.skip('TC_13.003.03 | Change the Appearance of user interface', () => {
      header.clickUserDropdownLink();
      header.clickUserConfigureItem();
      userPage.clickAppearanceDark();
      userPage.clickSaveButton();
      userPage.getDarkTheme().should('equal', 'dark');
  });

  it('TC_13.003.06 | Rename user', () => {
    header.clickUserName();
    basePage.clickConfigureLMenuOption()
    userPage.clearUserNameFieldFromConfig()
      .typeUserName(name.userName)
      .clickSaveButton();
    cy.request(
      {
        method: "GET",
        url: `http://${LOCAL_HOST}:${LOCAL_PORT}/${endPoint}`,
      }
    ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.save).to.eq('Save');
    })
    header.getBreadcrumbBar()
      .should('not.contain', 'Configure')
      .and('contain', name.userName);
    header.getUserNameLink().should('contain', name.userName);
    basePage.getJobHeadline().should('contain', name.userName);
  })
})