/// <reference types="cypress" />
import AddUserPage from "../pageObjects/AddUserPage"

class securityUsersPage {
  getCreateUser = () => cy.get('a[href="addUser"]');


  clickCreateUser() {
    this.getCreateUser().click()
  }

};

export default securityUsersPage;
