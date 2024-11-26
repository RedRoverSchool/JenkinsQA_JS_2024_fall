/// <reference types="cypress" />
class UserConfigurePage {
    getInsensitiveSearchLabel = () => cy.get("label[class='attach-previous ']");
    getInsensitiveSearchCheckBox = () => cy.get("input[name='insensitiveSearch']");
}
export default UserConfigurePage;