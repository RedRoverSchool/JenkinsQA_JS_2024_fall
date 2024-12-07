/// <reference types="cypress" />
import BasePage from "./basePage"

class PipelinePage extends BasePage { 

    getSaveButton = () => cy.get('.jenkins-submit-button');
    getPipelineDescriptionField = () => cy.get('textarea[name="description"]')
    getConfigureMenuOption = () => cy.get('a[href$="configure"]')
    getPipelineJobDescription = () => cy.get('#description')
    getStatusDisabledText = () => cy.get('#enable-project').contains('currently disabled');
    getToggleSelector = () => cy.get('#enable-disable-project');
    getPipelineScriptDropdownOption = () => cy.get('.jenkins-select__input.dropdownList').contains('Pipeline script');
    getScriptedPipelineDropdownOption = () => cy.get('.samples > select').contains('Scripted Pipeline');
    getScriptEditorDropdown = () => cy.get('.samples > select');
    getScriptEditorInputField = () => cy.get('.ace_content');
    getPipelineMenuOption = () => cy.get('button[data-section-id="pipeline"]');
    getPipelineScriptFromSCMDropdownOption = () => cy.get(':nth-child(9) > :nth-child(2) > .jenkins-select > .jenkins-select__input');
    getSCMDropdown = () => cy.get(':nth-child(9) > .jenkins-select > .jenkins-select__input');
    getRepositoryURLInputField =() => cy.get('input[name="_.url"]');

    clickSaveButton() {
        this.getSaveButton().click()
        return this
    }

    typePipelineDescription(description) {
        this.getPipelineDescriptionField().type(description)
        return this
    }

    clickConfigureMenuOption() {
        this.getConfigureMenuOption().click()
        return this
    }

    clearPipelineDescriptionField() {
        this.getPipelineDescriptionField().clear()
        return this
    }

    clickOnToggle() {
        this.getToggleSelector().uncheck({force:true});
        return this
    }
 
    clickPipelineMenuOption() {
        this.getPipelineMenuOption().click()
        return this
    }

    clickPipelineScriptDropdownOption() {
        this.getPipelineScriptDropdownOption().contains('Pipeline script').click({force: true})
        return this
    }

    selectScriptedPipelineOption() {
        this.getScriptEditorDropdown().select('Scripted Pipeline')
        return this
    }

    selectPipelineScriptFromSCMDropdownOption() {
        this.getPipelineScriptFromSCMDropdownOption().select('Pipeline script from SCM')
        return this
    }
    
    selectGitOption() {
        this.getSCMDropdown().select('Git')
        return this
    }
    
    typeRepositoryURL(url) {
      this.getRepositoryURLInputField().type(url, {force: true})
    }
}

export default PipelinePage;