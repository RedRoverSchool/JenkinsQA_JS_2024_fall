/// <reference types="cypress" />
import DashboardPage from "./DashboardPage";

class UserPage extends DashboardPage{

    getInsensitiveSearchLabel = () => cy.get("label[class='attach-previous ']");
    getInsensitiveSearchCheckBox = () => cy.get("input[name='insensitiveSearch']");
    getUserDescriptionFieldFromConfig = () => cy.get(".jenkins-input").eq("1");
    getUserAvatar = () => cy.get('h1 .icon-lg > svg');
    getUserDescription = () => cy.get('#description');
    getEditDescriptionBtn = () => cy.get("#description-link");
    getUserDescriptionFieldFromStatus = () => cy.get(".jenkins-input");
    getAppearanceDark = () => cy.get(':nth-child(1) > .help-sibling > .app-theme-picker__item > label');
    getDarkTheme = () => cy.get('html').invoke('attr', 'data-theme');
    getUserNameFieldFromConfig = () => cy.get('input[name="_.fullName"]');

    checkCheckBox() {
        this.getInsensitiveSearchCheckBox().check({ force: true })
        return this
    }

    clearUserDescription() {
        this.getUserDescriptionFieldFromConfig().clear()
        return this
    }

    typeUserDescription(userDescription) {
        this.getUserDescriptionFieldFromConfig().type(userDescription)
        return this
    }

    invokeTextUserDescription() {
        this.getUserDescriptionFieldFromConfig().invoke("val").as("textDescription");
        return this
    }

    clickEditDescriptionBtn() {
        this.getEditDescriptionBtn().click();
        return this;
    }

    clearUserDescriptionOnStatus() {
        this.getUserDescriptionFieldFromStatus().clear()
        return this
    }

    typeUserDescriptionOnStatus(userDescription) {
        this.getUserDescriptionFieldFromStatus().type(userDescription)
       return this
   }

    clickAppearanceDark() {
        this.getAppearanceDark().click()
       return this
    }

    clearUserNameFieldFromConfig() {
        this.getUserNameFieldFromConfig().clear()
        return this
    }

    typeUserName(userName) {
        this.getUserNameFieldFromConfig().type(userName)
        return this
    }
}

export default UserPage;