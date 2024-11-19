/// <reference types="cypress"/>

describe('US_14.002 | Header > Search Box', ()=>{
    it('TC_14.002-04 | Message that no matches found', ()=>{
        let unicNameProject = "The most unique project name is 12-35658_312"
        cy.get('input[name="q"]').type(unicNameProject + '{enter}')
        cy.url().should('includes', '/search/')
        // Check color and text contetn
        cy.get('div#main-panel > h1').should('have.css', 'color', 'rgb(20, 20, 31)')
        cy.get('div#main-panel > h1').contains("Search for 'The most unique project name is 12-35658_312'")
        // Check color and text error massage
        cy.get('div#main-panel > div.error').should('have.css', 'color', 'rgb(230, 0, 31)')
        cy.get('div#main-panel > div.error').contains("Nothing seems to match.")
    })
})
