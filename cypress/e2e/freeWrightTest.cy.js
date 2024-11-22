/// <reference types="cypress"/>
describe('US_001|Create pipeline project', ()=>{
it('Creating pipeline New Item', () => {
 cy.get('a[href="/view/all/newJob"]').click(); 
 cy.get('input#name').type('New Pipeline1');
 cy.get('.label').contains('Pipeline').click();
 cy.get('#ok-button').click();

cy.url().should('include', '/configure')
cy.get('div.jenkins-app-bar__content h1').should('contain.text', 'Configure');

cy.get('button[name="Submit"]').click()
cy.get('#jenkins-head-icon').click()
cy.get('.job-status-nobuilt').should('contain.text', 'New Pipeline1' )
cy.get('[id="job_New Pipeline1"]').should('be.visible')
cy.get('td a[href="job/New%20Pipeline1/"]').trigger('mouseover')
cy.get('#main-panel button.jenkins-menu-dropdown-chevron').click({force:true})
cy.get('[href="/job/New%20Pipeline1/doDelete"]').click({force:true})
cy.get('button[data-id="ok"').click()
cy.get('[id="job_New Pipeline1"]').should('not.exist')

})
})

