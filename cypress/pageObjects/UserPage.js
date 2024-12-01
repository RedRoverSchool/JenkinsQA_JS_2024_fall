/// <reference types="cypress" />

class UserPage {

    getInsensitiveSearchLabel = () => cy.get("label[class='attach-previous ']");
    getInsensitiveSearchCheckBox = () => cy.get("input[name='insensitiveSearch']");
    getSaveButton = () => cy.get("[name='Submit']");
    getUserDescriptionFieldFromConfig = () => cy.get(".jenkins-input").eq("1");
    getUserAvatar = () => cy.get('h1 .icon-lg > svg');
    getUserDescription = () => cy.get('#description');

    checkCheckBox() {
        this.getInsensitiveSearchCheckBox().check({ force: true })
        return this
    }

    clickOnSaveBtn() {
        this.getSaveButton().click()
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
}

export default UserPage;