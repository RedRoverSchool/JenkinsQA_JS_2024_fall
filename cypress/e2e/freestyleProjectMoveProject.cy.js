
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
 
})
 