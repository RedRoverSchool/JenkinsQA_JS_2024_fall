/// <reference types="cypress" />
import ManageJenkinsPage from "../pageObjects/ManageJenkinsPage";

class ConfigurePage {
   
    getBreadcrumbsManageJenkins = () => cy.get('[href="/manage/"]');
    
    clickBreadcrumbsManageJenkins() {
        this.getBreadcrumbsManageJenkins().click();
        return new ManageJenkinsPage();
    }
};
export default ConfigurePage;