/// <reference types="cypress" />
import AddUserPage from "../pageObjects/AddUserPage"

class securityUsersPage {
  getCreateUser = () => cy.get('a[href="addUser"]');
  getUserCreated = (userName) => cy.contains('a', userName);  

  clickCreateUser() {
    this.getCreateUser().click()
  }

  checkUserCreated(userName) {
    this.getUserCreated(userName).should('be.visible')
  }

};

export default securityUsersPage;
