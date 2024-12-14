/// <reference types="cypress" />
import ManageJenkinsPage from "../pageObjects/ManageJenkinsPage";
import BasePage from "./basePage";

class ConfigurePage extends BasePage {
   
    getBreadcrumbsManageJenkins = () => cy.get('[href="/manage/"]');
    getDisplayNameField = () => cy.get('input[class="jenkins-input validated  "]');

    clickBreadcrumbsManageJenkins() {
        this.getBreadcrumbsManageJenkins().click();
        return new ManageJenkinsPage();
    }

    typeDisplayName = (displayName) => {
        this.getDisplayNameField().type(displayName);
        return this;
    }
};
export default ConfigurePage;