/// <reference types="cypress"/>

describe('US_01.006 | FreestyleProject > Move project', ()=>{
    it('TC_01.006.01 | FreestyleProject > Move project | from Dashboard', () => {
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