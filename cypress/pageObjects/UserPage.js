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
    getAddNewTokenButton = () => cy.get('button.repeatable-add')
    getGenerateApiTokenButton = () => cy.get('button#api-token-property-token-save')
    getApiTokenValue = () => cy.get('span.new-token-value')
    getDeleteApiTokenButton = () => cy.get("a[data-confirm-title='Revoke Token']")
    getConfirmDeleteApiTokenButton = () => cy.get("button[data-id='ok']")
    getNewTokenNameField = () => cy.get('.jenkins-input.token-name')

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

    clickAddNewTokenButton() {
        this.getAddNewTokenButton().click()
       return this
    }

    clickGenerateApiTokenButton() {
        this.getGenerateApiTokenButton().click()
       return this
    }

    typeNewTokenName(tokenName) {
        this.getNewTokenNameField().type(tokenName)
        return this
    }

    generateNewApiToken(tokenName) {
       return this.clickAddNewTokenButton()
            .typeNewTokenName(tokenName)
            .clickGenerateApiTokenButton()
            .getApiTokenValue().should('be.visible')
            .invoke('text').then((tokenVal) => {
                const tokenValue = tokenVal.trim();  
                return tokenValue; 
            });
    }

    clickConfirmDeleteApiTokenButton() {
        this.getConfirmDeleteApiTokenButton().click()
       return this
    }

}

export default UserPage;