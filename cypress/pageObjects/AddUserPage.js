/// <reference types="cypress" />

class AddUserPage {
  getUserName = () => cy.get('#username');
  getPassword = () => cy.get('.setting-main').eq(1);
  getConfirmPassword = () => cy.get('.setting-main').eq(2);
  getEmail = () => cy.get('.setting-main').eq(4);
  getCreateUserBtn = () => cy.get('.jenkins-button').eq(0);

  typeUserName(userName) {
    this.getUserName().type(userName);
  }

  typePassword(password) {
    this.getPassword().type(password);
  }

  typeConfirmPassword(confirmPassword) {
    this.getConfirmPassword().type(confirmPassword);
  }

  typeEmail(email) {
    this.getEmail().type(email);
  }

  clickCreateUserBtn() {
    this.getCreateUserBtn().click({ force: true });
  }

  createUser(userName, password, email) {
    this.typeUserName(userName);
    this.typePassword(password);
    this.typeConfirmPassword(password);
    this.typeEmail(email);
    this.clickCreateUserBtn();
  }
}

export default AddUserPage;