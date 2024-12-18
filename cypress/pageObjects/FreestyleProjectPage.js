/// <reference types="cypress" />
import BasePage from "./basePage";

class FreestyleProjectPage extends BasePage {

    getJobDescription = () => cy.get('[id="description"]');// please rename to getProjectDescription since we are inside a project
    getJobDescriptionField = () => cy.get('textarea[name="description"]');// please rename to getProjectDescriptionield since we are inside a project
    getJobDescriptionField = () => cy.get('textarea[name="description"]');
    getAddDescriptionButton = () => cy.get('[href="editDescription"]');
    getProjectDestination = () => cy.get('select[name="destination"]');
    getProjectInfoSection = () => cy.get('#main-panel');
    getDeleteMenuItem = () => cy.get('a[data-title="Delete Project"]');// please rename to getDeleteProjectMenuOption since the option name is "Delete Project"
    getNewNameField = () => cy.get('[name="newName"]');
    getConfirmationMessageDialog = () => cy.get('.jenkins-dialog');
    getConfirmationMessageTitle = () => cy.get('.jenkins-dialog__title');
    getConfirmationMessageQuestion = () => cy.get('.jenkins-dialog__contents');
    getWarningMessageOnRenamePage = () => cy.get('.warning');
    getBuildHistoryTableRow = () => cy.get("tr.build-row");
    getHeaderOnRename = () => cy.get("div h1");
    getErrorMessageParagraph = () => cy.get('p');
    getConfigureMenuItem = () => cy.get('a[href$="/configure"]')
    getTriggerBuildsRemotelyCheckbox = () => cy.get('.jenkins-section .attach-previous').contains('Trigger builds remotely')
    getAuthTokenField = () => cy.get('input[name="authToken"]')


    typeJobDescription(jobDescription) {
        this.getJobDescriptionField().clear().type(jobDescription);
        return this;
    }

    clickAddDescriptionButton() {
        this.getAddDescriptionButton().click();
        return this;
    }

    selectNewProjectDestination(movingDestination) {
        this.getProjectDestination().select(movingDestination);
        return this;
    }

    clickDeleteMenuItem () {
        this.getDeleteMenuItem().click();
        return this;
    }

    clearJobDescriptionField() {
        this.getJobDescriptionField().clear();
        return this;
    }

    typeNewName(projectNewName) {
        this.getNewNameField().clear().type(projectNewName);
        return this;
    }

    clearRenameField() {
        this.getNewNameField().clear();
        return this;
    }

    typeRenameField(ProjectName) {
        this.getNewNameField().type(ProjectName);
        return this;
    }

    validateSpecialCharacters() {
        const specialChars = `!@#$%^*`.split("");

        specialChars.forEach((char) => {
            // Clear, type the new name, and click Save
            this.getNewNameField().clear().type(`Rename${char}Folder`);
            this.getRenameButton().click();

            // Assertions for error messages
            this.getHeaderOnRename().should("have.text", "Error");
            this.getErrorMessageParagraph().should(
                "have.text",
                `‘${char}’ is an unsafe character`
            );
            // Navigate back to retry the next character
            cy.go("back");
        });
    }

    assertRenameError() {
        this.getHeaderOnRename().should('have.text', 'Error');
        this.getErrorMessageParagraph().should('have.text', 'The new name is the same as the current name.');
        return this;
    }

    retrieveBuildNumberAndDate() {
        let arrayBuildData = []
        return this.getBuildHistoryTableRow()
          .each(($row) => {
            cy.wrap($row)
              .find("td div")
              .then(($td) => {
                arrayBuildData.push({
                  buildNumber: $td[0].innerText,
                  buildDate: $td[2].innerText,
                });
              });
          })
          .then(() => {
            return arrayBuildData
          });
    };

    clickConfigureMenuButton() {
        this.getConfigureMenuItem().click()
        return this
    }

    checkTriggerBuildsRemotelyCheckbox() {
        this.getTriggerBuildsRemotelyCheckbox().click()
        return this
    }

    typeAuthTokenName(tokenName) {
        this.getAuthTokenField().type(tokenName)
        return this
    }
}
export default FreestyleProjectPage;