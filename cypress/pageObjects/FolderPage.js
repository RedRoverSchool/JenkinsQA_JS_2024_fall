/// <reference types="cypress" />
import BasePage from "./basePage";
import NewJobPage from "./NewJobPage";


class FolderPage extends Header {
    getSaveBtn = () => cy.get(".jenkins-submit-button");
    getTitleConfiguration = () => cy.get("#side-panel h1");
    getFolderNameOnMainPanel = () => cy.get("#main-panel");
    getDashboardBreadcrumbsLink = () => cy.get('#breadcrumbs a[href="/"]');
    getNewItemMenuOption = () => cy.get('[href $= "/newJob"]');

    getNewNameField = () => cy.get('input[name="newName"]');
    getFolderUrl = () => cy.url({ decode: true });
    getProjectName = () => cy.get('*.jenkins-table__link span');//probably rename to getFolderName or see BasePage
    getCreateAJobLink = () => cy.get('a[href="newJob"]');
    getDescriptionField = () => cy.get('textarea[name="description"]');
    getFolderDescription = () => cy.get('#view-message');
    getFolderAddDescription = () => cy.get('a#description-link');
    getFolderEditDescription = () => cy.get('a[href="editDescription"]');
    getFolderDescriptionField = () => cy.get('div#description');

    clickSaveBtn () {
        this.getSaveBtn().click();
        return this;
    }

    verifyTitleConfigurationIsVisible () {
        this.getTitleConfiguration()
            .should('be.visible');
        return this;
    }

    clearNewNameField () {
        this.getNewNameField().clear();
        return this;
    }

    typeNewFolderName (newFolderName) {
        this.getNewNameField().type(newFolderName);
        return this;
    }   

    verifyFolderUrl(folderName) {
        this.getFolderUrl().should('contain', folderName)
    }

    clickCreateAJobLink () {
        this.getCreateAJobLink().click()
        return new NewJobPage();
    }

    typeDescription (description) {
        this.getDescriptionField().type(description);
            return this;
    };
   
    typeEditDescription (newDescription) {
            this.getDescriptionField().type(newDescription);
                return this;
    };
    clearDescription (description) {
        this.getDescriptionField().clear('description', {delay: 0});
        return this
        }
    clickaddDescriptionBtn(){
        this.getFolderAddDescription().click()
            return this;
        }
    clickeditDescriptionBtn(){
        this.getFolderEditDescription().click()
            return this
        }
    } 


        this.getDescriptionField().type(description, {delay: 0});
        return this;
    };
};

export default FolderPage;