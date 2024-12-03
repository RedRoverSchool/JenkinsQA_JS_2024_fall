/// <reference types="cypress" />

import DashboardPage from "./DashboardPage";

class FreestyleProjectPage {

    getSaveButton = () => cy.get('button[name="Submit"]');
    getJobHeadline = () => cy.get("#main-panel h1");
    getJobDescription = () => cy.get('[id="description"]');
    getJobDescriptionField = () => cy.get('textarea[name="description"]');
    getDashboardBreadcrumbsLink = () => cy.get('#breadcrumbs a[href="/"]');
    getAddDescriptionButton = () => cy.get('[href="editDescription"]');
    getMoveMenuItem = () => cy.get('a[href$="/move"]');
    getProjectDestination = () => cy.get('select[name="destination"]');
    getMoveButton = () => cy.get('button[name="Submit"]');
    getProjectInfoSection = () => cy.get('#main-panel');
    getDashboardLink = () => cy.get('a[href="/"].model-link');
    getConfigureLink = () => cy.get('a[href$="configure"]');
    getDeleteMenuItem = () => cy.get('a[data-title="Delete Project"]');
    getCancelButton = () => cy.get('button[data-id="cancel"]');
    getYesButton = () => cy.get('button[data-id="ok"]');
    getRenameButton = () => cy.get('[href*="rename"]');
    getNewNameField = () => cy.get('[name="newName"]');
    getRenameButtonSubmit = () => cy.get('button.jenkins-submit-button');
    getBreadcrumbBar = () => cy.get('#breadcrumbBar');
    getConfirmationMessageDialog = () => cy.get('.jenkins-dialog');
    getConfirmationMessageTitle = () => cy.get('.jenkins-dialog__title');
    getConfirmationMessageQuestion = () => cy.get('.jenkins-dialog__contents');
    getBuildNowLink = () => cy.contains('a[href*="build"]', "Build Now");
    getBuildHistoryTableRow = () => cy.get("tr.build-row");
    getHeaderOnRename = () => cy.get("div h1");
    getErrorMessageParagraph = () => cy.get('p')

    clickSaveButton() {
        this.getSaveButton().click();
        return this;
    }

    typeJobDescription(jobDescription) {
        this.getJobDescriptionField().clear().type(jobDescription);
        return this;
    }

    clickDashboardBreadcrumbsLink() {
        this.getDashboardBreadcrumbsLink().click();
        return new DashboardPage();
    }

    clickAddDescriptionButton() {
        this.getAddDescriptionButton().click();
        return this;
    }

    clickMoveMenuItem() {
        this.getMoveMenuItem().click();
        return this;
    }

    selectNewProjectDestination(movingDestination) {
        this.getProjectDestination().select(movingDestination);
        return this;
    }

    clickMoveButton() {
        this.getMoveButton().click();
        return this;
    }

    clickConfigureLink() {
        this.getConfigureLink().click();
        return this;
    }

    clickDeleteMenuItem() {
        this.getDeleteMenuItem().click()
        return this
    }

    clickCancelButton() {
        this.getCancelButton().click()
        return this
    }

    clickYesButton() {
        this.getYesButton().click()
        return new DashboardPage();
    }

    clearJobDescriptionField() {
        this.getJobDescriptionField().clear();
        return this;
    }

    clickRenameButton() {
        this.getRenameButton().click();
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

    clickRenameButtonSubmit() {
        this.getRenameButtonSubmit().click();
        return this;
    }

    validateSpecialCharacters() {
        const specialChars = `!@#$%^*`.split("");

        specialChars.forEach((char) => {
            // Clear, type the new name, and click Save
            this.getNewNameField().clear().type(`Rename${char}Folder`);
            this.getSaveButton().click();

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

    clickBuildNowLink() {
        this.getBuildNowLink().click()
        return this
    };
    
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
    
}
export default FreestyleProjectPage;