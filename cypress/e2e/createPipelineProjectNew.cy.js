describe('US_00.002 | New Item > Create Pipeline Project #14', () => {
    
    it('TC_00.002.006 | New Pipeline Project Create', () => {
        let itemName = 'MyTestPipeline'
        cy.get('span').contains('New Item').click()
        cy.get('#name').type(itemName)
        cy.get('span').contains('Pipeline').click()
        cy.get('#ok-button').click()
        cy.url().should('include', itemName)
        cy.get('button[name="Submit"]').click({ force: true })     
        cy.get('.model-link').click()
        cy.get(`#job_${itemName}`).should('exist')
    })

    it('TC_00.002.007 | New Pipeline Project check Item name valid', () => {
        let symbols = '!@#$%^&*\|:?><][;/'
        cy.get('span').contains('New Item').click()
        for (let i = 0; i < symbols.length; i++){
            cy.get('#name').clear()
            cy.get('#itemname-invalid').should('have.class', 'input-message-disabled')
            cy.get('#name').type(symbols[i])
            cy.get('#itemname-invalid')
            .should('not.have.class', 'input-message-disabled')
            .should('have.text', `» ‘${symbols[i]}’ is an unsafe character`)
            .should('have.css', 'color', 'rgb(230, 0, 31)')
        }
        cy.get('#name').clear()  
        cy.get('#name').type('.')
        cy.get('#itemname-invalid')
        .should('not.have.class', 'input-message-disabled')
        .should('have.text', '» “.” is not an allowed name')
        .should('have.css', 'color', 'rgb(230, 0, 31)')            
    })
})
