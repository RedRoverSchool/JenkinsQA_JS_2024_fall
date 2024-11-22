
///<reference types = 'cypress'/>

describe ('US_01.006 | FreestyleProject > Move project', () => {

    it('TC_01.006.01-A | FreestyleProject>Move project from the Project Page',() => {
        cy.get('span').contains('New Item').click()
        cy.get('#name').type('NewFolder')
        cy.get('span.label').contains('Folder').click()
        cy.get('#ok-button').click({force: true})
        cy.get('[name="Submit"]').click()
        cy.get('#breadcrumbs > li:nth-child(1) > a').click()
        cy.get('span').contains('New Item').click()
        cy.get('#name').clear()
        cy.get('#name').type('NewProject')
        cy.get('span.label').contains('Freestyle project').click()
        cy.get('#ok-button').click({force: true})
        cy.get('[name="Submit"]').click()
        cy.url().should('include', 'NewProject')
        cy.get('#tasks > div:nth-child(8) > span > a > span.task-link-text').click({force: true})
        cy.get('[name="destination"]').select('/NewFolder')
        cy.get('#main-panel > form > button').click()
 
        cy.url().should('include', 'NewProject')
                .and('include','NewFolder')
 
    })
    it('TC_01.006.04 | FreestyleProject > Move project | from Dashboard', () => {
        cy.get('span.task-link-text').eq(0).click({force:true})
        cy.get('input[id="name"]').click().type('New Folder')
        cy.get('li.com_cloudbees_hudson_plugins_folder_Folder').click({force: true})
        cy.get('button').contains('OK').click()
        cy.get('button').contains('Save').click()
        cy.visit('http://localhost:8080/')
        cy.get('span.task-link-text').eq(0).click({force:true})
        cy.get('input[id="name"]').click().type('New Job')
        cy.get('li.hudson_model_FreeStyleProject').click({force: true})
        cy.get('button').contains('OK').click()
        cy.get('button').contains('Save').click()

        cy.visit('http://localhost:8080/')
        cy.get('button.jenkins-menu-dropdown-chevron').eq(3).click({force: true})
        cy.get('a.jenkins-dropdown__item').contains('Move').invoke('text').then((Text) => {
            const trimtxt=Text.trim()
            expect(trimtxt).to.equal('Move')

        }).wait(1000)
        cy.get('a.jenkins-dropdown__item').contains('Move').click()
        cy.get('select.setting-input').select(1)
        cy.get('button').contains('Move').click()
        cy.visit('http://localhost:8080/job/New%20Folder/').contains('New Job')

    })
 


    const LOCAL_PORT = Cypress.env('local.port');
    const LOCAL_HOST = Cypress.env('local.host');

    it('TC_01.006.02 |Choose from a list of available folders',() => {
        cy.get('span').contains('New Item').click()
        cy.get('#name').type('Project')
        cy.get('span.label').contains('Freestyle project').click()
        cy.get('#ok-button').click({force: true})
        cy.get('[name="Submit"]').click()
        cy.url().should('include', 'Project')
        cy.get('#jenkins-home-link').click()
        cy.get('span').contains('New Item').click()
        cy.get('input[name="name"]').type('Folder1')
        cy.get('.com_cloudbees_hudson_plugins_folder_Folder').click()
        cy.get('button').contains('OK').click()
        cy.get('button').contains('Save').click()
        cy.get('#jenkins-home-link').click()
        cy.get('span').contains('New Item').click()
        cy.get('input[name="name"]').type('Folder2')
        cy.get('.com_cloudbees_hudson_plugins_folder_Folder').click()
        cy.get('button').contains('OK').click()
        cy.get('button').contains('Save').click()
        cy.get('#jenkins-home-link').click()
        cy.get('[href="job/Project/"]').realHover({ position: 'center' })
        cy.get(`button[data-href="http://${LOCAL_HOST}:${LOCAL_PORT}/job/Project/"]`).click()
        cy.get('a[href="/job/Project/move"]').click()
        cy.get('[name="destination"]').select('/Folder2')
        cy.get('button').contains('Move').click()

        cy.get('div[id="main-panel"]').should('contain','Folder2/Project')
    });

    it('TC_01.006.05 | Move project from Dashboard to Folder', () => {
        cy.get('a[href="/view/all/newJob"]').click();
        cy.get('#name').type('New Project Name');
        cy.get('.hudson_model_FreeStyleProject').click();
        cy.get('#ok-button').click();
        cy.get('[name="Submit"]').click();
        cy.get('#jenkins-home-link').click();
        cy.get('a[href="/view/all/newJob"]').click();
        cy.get('#name').type('New Folder Name');
        cy.get('.com_cloudbees_hudson_plugins_folder_Folder').click();
        cy.get('#ok-button').click();
        cy.get('[name="Submit"]').click();
        cy.get('#jenkins-home-link').click();
        cy.get('button[data-href*="Project"]').click({force: true});
        cy.get('a[href*="move"]').click();
        cy.get('select[name="destination"]').select('/New Folder Name');
        cy.get('[name="Submit"]').click();
        cy.get('#jenkins-home-link').click();
        cy.get('span').contains('New Folder Name').click();

        cy.get('.jenkins-table__link > span').should('have.text','New Project Name')
    });

})
 