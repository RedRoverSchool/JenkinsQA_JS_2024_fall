describe('US_00.002 | New Item > Create Pipeline Project #14', () => {
    
    it.only('TC_00.002.006 | New Pipeline Project Create', () => {
        let itemName = 'MyTestPipeline'
        cy.get('span').contains('New Item').click()
        cy.get('#name').type(itemName)
        cy.get('span').contains('Pipeline').click()
        cy.get('#ok-button').click()
        cy.url().should('include', itemName)
        cy.get('button[name="Submit"]').click({ force: true })     
        cy.get('.model-link').click()
        cy.get(`#job_${itemName}`).should('exist')
    })})