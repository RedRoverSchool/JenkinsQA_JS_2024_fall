/// <reference types="cypress"/>
import { faker } from '@faker-js/faker';

const btnNewItem = 'a[href="/view/all/newJob"]'
const jobFreeStyleProject = ".hudson_model_FreeStyleProject"

describe('US_01.004 | FreestyleProject > Delete Project', ()=>{
    const inputField = 'input#name.jenkins-input';
    const randomItemName = faker.lorem.words();  
    const btnOK = '#ok-button';
    const btnSave = 'button[name="Submit"]';
    const btnYes = 'button.jenkins-button.jenkins-button--primary ';
    const jenkinsLogo = 'a#jenkins-home-link';
    const dropdownChevron = '.jenkins-table__link > .jenkins-menu-dropdown-chevron';
    const dropdownItem = '.jenkins-dropdown__item ';
    const dashboardPage = 'div#main-panel';
    const welcomeToJenkins = '.empty-state-block h1';

    it('TC_00.001.04 A|FreestyleProject > Delete Project from the dashboard', () => {
        cy.get('span').contains('Create a job').click();
        cy.get('input[name="name"]').type('New Freestyle project');
        cy.get('span.label').contains('Freestyle project').click();
        cy.get('button').contains("OK").click();
        cy.get('button').contains("Save").click();
        cy.get('a').contains("Dashboard").click();
        cy.get('span').contains('New Freestyle project').scrollIntoView();
        cy.get('span').contains('New Freestyle project').realHover();
        cy.get('button[data-href="http://localhost:8080/job/New%20Freestyle%20project/"]').click();
        cy.get('button[href="/job/New%20Freestyle%20project/doDelete"]').click();
        cy.get('button.jenkins-button.jenkins-button--primary ').click();
        cy.get('#main-panel h1').should('have.text', "Welcome to Jenkins!");
    })
    it('TC_00.004.01 | Verify user able to delete existing project from Dashboard', () =>{

        cy.get('span.task-link-text').contains("New Item").click({force:true});
        cy.get('input[name="name"]').type('Pro1');
        cy.get('span.label').contains('Freestyle project').click();
        cy.get('button').contains("OK").click();
        cy.get('button').contains("Save").click();
        cy.get('a').contains("Dashboard").click();
        cy.get('td>a>button[class="jenkins-menu-dropdown-chevron"]').click({force:true});
        cy.get('div[class="jenkins-dropdown"]')
        cy.get('div>button[href="/job/Pro1/doDelete"]').click({force:true});
        cy.get("button[data-id='ok']").contains("Yes").click();
        
        cy.get('#main-panel h1').should('have.text', "Welcome to Jenkins!");

    })
    
    it('TC_01.004.08 |Pop up window appears before deletion', () => {
        
        cy.get('span').contains('New Item').click()
        cy.get('input[name="name"]').type('Project')
        cy.get('span.label').contains('Freestyle project').click()
        cy.get('button').contains('OK').click()
        cy.get('button').contains('Save').click()
        cy.get('.job-index-headline').contains('Project').should('exist')
        cy.get('span').contains('Delete Project').click() 
        cy.get('button[data-id="ok"]').click()

        cy.contains('Project').should('not.exist')
        
    })

    it('TC_01.004.07 | Verify confirmation appears before deletion', () => {
        let projectName = 'New project';
        cy.log('Preconditions');
        cy.get('a:contains("New Item")').click();
        cy.get('input#name').type(projectName);
        cy.get('div').contains('Freestyle project').click();
        cy.get('button#ok-button').click();
        cy.get('button:contains("Save")').click();
        cy.get('a:contains("Dashboard")').click();

        cy.log('Test body');
        cy.get('a span').contains(projectName).realHover();
        cy.get(`button[data-href$="${projectName.split(' ')[1]}/"]`).click();
        cy.get('.jenkins-dropdown__item ').contains('Delete Project').click();
        cy.get('dialog.jenkins-dialog').should('exist')
                                       .and('contain.text', `Delete the Project ‘${projectName}’?`);
        cy.get("button[data-id='ok']").should('exist')
                                      .and('not.be.disabled');
        cy.get("button[data-id='cancel']").should('exist')
                                          .and('not.be.disabled');                              
    })
    
    it('TC_01.004.10 | Verify Freestyle Project is deleted from Dashboard page', () => {

        cy.log('Creating Freestyle project')
        cy.get(btnNewItem).click()
        cy.get(inputField).type(randomItemName)
        cy.get(jobFreeStyleProject).click()
        cy.get(btnOK).click()
        cy.get(btnSave).click()
        cy.get(jenkinsLogo).click()

        cy.log('Deleting Freestyle project')
        cy.contains(randomItemName).realHover()
        cy.get(dropdownChevron).click()
        cy.get(dropdownItem).each(($els) => {
            let eText = $els.text().trim()
            if (eText == 'Delete Project') { cy.wrap($els).click() }
        })
        cy.get(btnYes).click()

        cy.get(dashboardPage).contains(randomItemName).should('not.exist')
        cy.get(welcomeToJenkins).should('be.visible')
    })
  
    it('TC_01.004.03 | Delete a project from the Dashboard page', () => {

        let oldName = 'OurPapka';
        const locateNewItemlink = '[href="/view/all/newJob"]';
        const newItemInputField = '#name';
        const labelFolder= 'label';
        const okButton = '#ok-button'; 
        const saveButton = '[name="Submit"]';
        const dashboardButton = '.model-link';
        const folderNameOnPanel = 'span';
        const checkMark = `[data-href="http://localhost:8080/job/${oldName}/"]`;
        const deleteFolderElement = `[href="/job/${oldName}/doDelete"]`;
        const yesButton = '[data-id="ok"]';

        cy.get(locateNewItemlink).click();
        cy.get(newItemInputField).type(oldName); 
        cy.get(labelFolder).contains('Folder').click();
        cy.get(okButton).click();
        cy.get(saveButton).click();

        cy.url().should('include',oldName);
        cy.get('#main-panel').contains(oldName).should('be.visible');
            
        cy.get(dashboardButton).contains('Dashboard').click();
        cy.get(folderNameOnPanel).contains(oldName).realHover();
        cy.get(checkMark).click();
        cy.get(deleteFolderElement).click();
        cy.get(yesButton).click();

        cy.get(folderNameOnPanel).contains(oldName).should('not.exist')
        
    });

})