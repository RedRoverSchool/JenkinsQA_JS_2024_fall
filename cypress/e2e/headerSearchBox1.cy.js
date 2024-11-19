/// <reference types="cypress" />

describe('US_14.002 | Header > Search Box', () => {
    it('TC_14.002-08-A |Case insensitive search', () => {
        cy.get('div[class="login page-header__hyperlinks"] a[class="model-link"]').should('be.visible').click()
        cy.url().should('include', '/user');
        cy.get('div:nth-child(3) span:nth-child(1) a:nth-child(1)').click()
        cy.get("label[class='attach-previous ']").should('contain', 'Insensitive search tool').and('exist')
        cy.get("input[name='insensitiveSearch']")
            .should("exist")
            .uncheck({ force: true }) 
            .should("not.be.checked")
            .check({ force: true })   
            .should("be.checked");
    });
});