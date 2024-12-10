/// <reference types="cypress"/>

import Header from "../pageObjects/Header";
import UserPage from "../pageObjects/UserPage";
import { faker } from "@faker-js/faker";
import { userDropdownLink } from '../fixtures/dashboardPageData'; 
import BasePage from "../pageObjects/basePage";

const userDescription = faker.lorem.paragraph();
const header = new Header();
const userPage = new UserPage();
const basePage = new BasePage();


describe('US_13.003 | User > Config', () => {

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
    userPage.clearUserNameFieldFromConfig();
    userPage.typeUserName('UserName')
    userPage.clickSaveButton();
    header.getBreadcrumbBar().should('not.contain', 'Configure');
    header.getUserNameLink().should('contain', 'UserName');
    header.getBreadcrumbBar().should('contain', 'UserName');
    basePage.getJobHeadline().should('contain', 'UserName');
  })
})