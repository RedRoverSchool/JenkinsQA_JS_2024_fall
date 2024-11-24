/// <reference types="cypress"/>

import { faker } from '@faker-js/faker';

const randomItemName = faker.lorem.words(); 

const btnNewItem = 'a[href$="/newJob"]';
const jobFreeStyleProject = '[class$=FreeStyleProject]';
const inputField = 'input#name';
const btnOK = '#ok-button';
const btnSave = 'button[name="Submit"]';
const projectNameHeadline = '#main-panel h1'
const btnDeleteProjectInsideProject = 'a[data-title="Delete Project"]'
const confirmationMessageDialog = '.jenkins-dialog';
const confirmationMessageTitle = '.jenkins-dialog__title';
const confirmationMessageQuestion = '.jenkins-dialog__contents';
const btnYes = 'button[data-id="ok"] ';
const btnCancel = 'button[data-id="cancel"]';
const jenkinsLogo = 'a#jenkins-home-link';
const dropdownChevron = '.jenkins-table__link > .jenkins-menu-dropdown-chevron';
const dropdownItem = '.jenkins-dropdown__item ';
const dashboardPage = 'div#main-panel';
const welcomeToJenkins = '.empty-state-block h1';

describe('US_01.004 | FreestyleProject > Delete Project', () => {

    beforeEach(function () {
        cy.fixture('deleteProject').then((deleteProject) => {
            this.deleteProject = deleteProject;
        });
    });
    
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
  
    it("TC_01.004.11 |Verify user is able to cancel project deleting", () => {
        const newItemLink = cy.get(".task-link-text").contains("New Item");
        const jenkinsMainPage = cy.get('img[alt="Jenkins"]');
        const newProjName = "New project";
    
        newItemLink.click({ force: true });
        cy.get("input#name").type(newProjName);
        cy.get(".label").contains("Freestyle project").click();
        cy.get("button#ok-button").click();
        cy.get('button[name="Submit"]').click();
    
        jenkinsMainPage.click();
        cy.get('td a[href="job/New%20project/"]').trigger("mouseover");
        cy.get("#main-panel button.jenkins-menu-dropdown-chevron").click({
          force: true,
        });
        cy.get('[href="/job/New%20project/doDelete"]').click({ force: true });
        cy.get('button[data-id="cancel"]').should("be.visible");
        cy.get('button[data-id="cancel"]').click();
    
        cy.get('td a[href="job/New%20project/"]').should("be.visible");
    }); 

    it('TC_01.004.12 | Verify confirmation message appears after attempting to delete a project', function () {
        
        cy.log('Creating Freestyle Project');
        cy.get(btnNewItem).click();
        cy.get(inputField).type(randomItemName);
        cy.get(jobFreeStyleProject).click();
        cy.get(btnOK).click();
        cy.get(btnSave).click();
        cy.get(projectNameHeadline).should('be.visible').and('have.text', randomItemName);

        cy.log('Deleting Freestyle Project');
        cy.get(btnDeleteProjectInsideProject).click();

        cy.get(confirmationMessageDialog).should('be.visible');
        cy.get(confirmationMessageTitle).should('have.text', this.deleteProject.confirmationMessage.title);
        cy.get(confirmationMessageQuestion).should('have.text', `${this.deleteProject.confirmationMessage.question} ‘${randomItemName}’?`);

    });

    it("TC_01.004.05-A | FreestyleProject > Delete Project | Cancel deletion", () => {
        cy.get('a[href="/view/all/newJob"]').click();
        cy.get('.jenkins-input').type('testDeleteProject');
        cy.get('.label').contains('Freestyle project').click();
        cy.get('#ok-button').click();
        cy.get('textarea[name="description"]').type('...some description...')
        cy.get('button[formnovalidate="formNoValidate"]').click();
        cy.get('a[href="/"]').first().click();
        cy.get('#projectstatus').contains('testDeleteProject').click();
        cy.get('a[data-title="Delete Project"]').click();
        cy.get('button[data-id="cancel"]').click();
        cy.get('a[href="/"]').first().click();
        cy.get('.jenkins-table__link span').should('have.text','testDeleteProject')
      });

    it('TC_01.004.14-A | Verify Freestyle Project is deleted from Project page', () => {

        cy.log('Creating Freestyle project')
        cy.get(btnNewItem).click()
        cy.get(inputField).type(randomItemName)
        cy.get(jobFreeStyleProject).click()
        cy.get(btnOK).click()
        cy.get(btnSave).click()
        cy.get(jenkinsLogo).click()

        cy.log('Deleting Freestyle project')
        cy.contains(randomItemName).trigger('mouseover')
            .click()
        cy.get(projectNameHeadline).should('be.visible').and('have.text', randomItemName)
        cy.get(btnDeleteProjectInsideProject).click()
        cy.get(btnYes).click()

        cy.get(dashboardPage).contains(randomItemName).should('not.exist')
        cy.get(welcomeToJenkins).should('be.visible')
    })

    it('TC_01.004.15-A | Verify user cancels Project deletion', () => {

        cy.log('Creating Freestyle project')
        cy.get(btnNewItem).click()
        cy.get(inputField).type(randomItemName)
        cy.get(jobFreeStyleProject).click()
        cy.get(btnOK).click()
        cy.get(btnSave).click()
        cy.get(jenkinsLogo).click()

        cy.log('Attempting to delete Freestyle project');
        cy.contains(randomItemName).trigger('mouseover')
        cy.get(dropdownChevron).click({force: true})
        cy.contains('Delete Project').click()

        cy.log('Cancelling deletion')
        cy.get(btnCancel).click()

        cy.log('Verifying Freestyle Project is still present on Dashboard');
        cy.get(dashboardPage).contains(randomItemName).should('exist').and('be.visible')
    })

    it('TC_01.004.16 | Verify that user can delete Freestyle Project from the Dashboard page', () => {

        const name = "New Freestyle Project";
        const addNewItem = 'a[href="/view/all/newJob"]';
        const nameField = '#name';
        const itemType = '.label';
        const okBtn = '#ok-button';
        const submitBtn = '[name="Submit"]';
        const navBtn = '.model-link';
        const tableName = '.jenkins-table__link';
        const dropDownMenu = '.jenkins-menu-dropdown-chevron';
        const dropDownItem = '.jenkins-dropdown__item ';
        const okDelBtn = '[data-id="ok"]';
        const dashboardPage = '#main-panel';


        cy.get(addNewItem).click();
        cy.get(nameField).type(name);
        cy.get(itemType).contains('Freestyle project').click();
        cy.get(okBtn).click();
        cy.get(submitBtn).click();
        cy.get(navBtn).contains('Dashboard').click();
        cy.get(tableName).should('contain', name);

        cy.get(dropDownMenu).eq(2).click({ force: true });
        cy.get(dropDownItem).eq(4).click();
        cy.get(okDelBtn).click();

        cy.get(dashboardPage).contains(name).should('not.exist');
    })
})
