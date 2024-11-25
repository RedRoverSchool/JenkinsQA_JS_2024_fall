/// <reference types="cypress" />
class UserConfigurePage {
    getInsensitiveSearch = () => cy.get("label[class='attach-previous ']");
    getInsensitiveCheckBox = () => cy.get("input[name='insensitiveSearch']");

    checkInsensitiveBox() {
        this.getInsensitiveCheckBox()
            .uncheck({ force: true });
        return this;
    }
}
export default UserConfigurePage;