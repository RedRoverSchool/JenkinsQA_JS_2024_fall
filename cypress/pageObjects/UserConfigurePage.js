/// <reference types="cypress" />
class UserConfigurePage {
    getInsensitiveSearchLabel = () => cy.get("label[class='attach-previous ']");
    getInsensitiveSearchCheckBox = () => cy.get("input[name='insensitiveSearch']");
    getSaveButton = () => cy.get("[name='Submit']");


    checkCheckBox() 
    {
        this.getInsensitiveSearchCheckBox().check()
        return this
    }

    clickOnSaveBtn()
    {
        this.getSaveButton().click()
        return this
    }   
}
export default UserConfigurePage;

