/// <reference types="cypress"/>

describe('US_01.004 | FreestyleProject > Delete Project', ()=>{
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


    it('TC_01.004.03 | Delete a project from the Dashboard page', () => {

        let oldName = 'OurPapka';
        const locateNewItemlink = '[href="/view/all/newJob"]';
        const newItemInputfield = '#name';
        const labelFolder= 'label';
        const okButton = '#ok-button'; 
        const saveButton = '[name="Submit"]';
        const dashboardButton = '.model-link';
        const folderNameonPanel = 'span';
        const checkMark = `[data-href="http://localhost:8080/job/${oldName}/"]`;
        const deleteFolderElement = `[href="/job/${oldName}/doDelete"]`;
        const yeSButton = '[data-id="ok"]'

            cy.get(locateNewItemlink).click();
            cy.get(newItemInputfield).type(oldName); 
            cy.get(labelFolder).contains('Folder').click();
            cy.get(okButton).click();
            cy.get(saveButton).click();
            cy.url().should('include',oldName);

            cy.get('#main-panel').contains(oldName).should('be.visible');
            
            cy.get(dashboardButton).contains('Dashboard').click();
            cy.get(folderNameonPanel).contains(oldName).realHover();
            cy.get(checkMark).click();
            cy.get(deleteFolderElement).click();
            cy.get(yeSButton).click();

            cy.get(folderNameonPanel).contains(oldName).should('not.exist')
        
    });
})