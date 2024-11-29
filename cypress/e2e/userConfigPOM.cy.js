/// <reference types="cypress"/>

import Header from "../pageObjects/Header";
import UserPage from "../pageObjects/UserPage";
import { faker } from "@faker-js/faker";

const userDescription = faker.lorem.paragraph();
const header = new Header();
const userPage = new UserPage();


describe('US_13.003 | User > Config', () => {

    it('TC_13.003.02 | Update Profile Description via Config Menu', () => {
        header.clickUserDropdownLink();
        header.clickUserConfigureItem();
        userPage.clearUserDescription();
        userPage.typeUserDescription(userDescription).invokeTextUserDescription();
        userPage.clickOnSaveBtn();
        userPage.getUserAvatar().should('be.visible');
        userPage.getUserDescription().should('have.text', userDescription);
    })
})