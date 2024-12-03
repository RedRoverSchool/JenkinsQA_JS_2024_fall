/// <reference types="cypress" />
describe.skip('US_13.003 | User > Config', ()=>{
    it('TC_13.003.01 | Edit the profile description from the account settings page by clicking on your username' , ()=>{
        cy.get('[href^="/user"]').click()
        cy.get('#description-link').click()
        cy.get(".jenkins-input").clear()
        .type("My new description")
        cy.get('[name="Submit"]').click()
        cy.get('#description').should('have.text', "My new description")
    })

    it('TC_13.003.02 | Update Profile Description via Config Menu', () => {
        cy.get('#page-header .jenkins-menu-dropdown-chevron').realHover().click();
        cy.get('[href$="configure"]').click();
        cy.get(".jenkins-input").eq("1").clear();
        cy.get(".jenkins-input").eq("1").type("my new description for testing");
        cy.get('[name="Submit"]').click()
        cy.get('h1 span.icon-lg').should('be.visible');
        cy.get('#description').should('contains', /new description/);
    })

    it('TC_13.003.03 | User > Config > Change the Appearance of user interface', () => {
        cy.get('#page-header .jenkins-menu-dropdown-chevron').click({force: true});
        cy.get(`a[href="/user/admin/configure"]`).click();
        cy.get(':nth-child(1) > .help-sibling > .app-theme-picker__item > label').click();
        cy.get('.jenkins-button').contains('Save').click();
        cy.get('html').should('have.attr', 'data-theme', 'dark');
      })
})