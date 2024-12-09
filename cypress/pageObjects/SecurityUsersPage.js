/// <reference types="cypress" />

class securityUsersPage {
  getCreateUser = () => cy.get('a[href="addUser"]');


  clickCreateUser() {
    this.getCreateUser().click()
  }

};

export default securityUsersPage;
