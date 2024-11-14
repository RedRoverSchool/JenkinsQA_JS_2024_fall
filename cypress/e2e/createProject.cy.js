///<reference types ="cypress" />
describe('US_001 | Create the project and delete', () => {
    beforeEach(() => {
        cy.visit('http://localhost:9090/login?from=%2F')
        cy.get('#j_username').type('admin')
        cy.get('#j_password').type('admin')
        cy.get('button').contains('Sign in').click()
            .should('be.visible', 'Welcome to Jenkins!')
    })

    it('TC-001-1-A|Create the project', () => {
        cy.contains('New Item').click()
        cy.get('#name').type('First Project')
        cy.contains('Freestyle project').click()
        cy.get('#ok-button').click({ force: true })
            .should('be.visible', 'First Project')
        cy.get('button').contains('Save').click()
            .should('be.visible', 'First Project')
        cy.url().should('includes', '/First%20Project/')
        cy.contains('Dashboard').click()
    })
    it('TC-001-2-A|Delete the project', () => {
        cy.get('span').contains('First Project').realHover()
        cy.get('button[data-href="http://localhost:9090/job/First%20Project/"]').click()
        cy.get('button[href="/job/First%20Project/doDelete"]').click()

        cy.get('button.jenkins-button.jenkins-button--primary ').click()
        cy.get('span').contains('First Project').should('not.exist')

    })
})
