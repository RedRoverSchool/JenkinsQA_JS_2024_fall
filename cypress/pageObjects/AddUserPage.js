/// <reference types="cypress" />

class AddUserPage {
  getUserName = () => cy.get('#username');
  getPassword = () => cy.get('input[name="password1"]');
  getConfirmPassword = () => cy.get('input[name="password2"]');
  getEmail = () => cy.get('input[name="email"]');
  getCreateUserBtn = () => cy.findAllByRole ('button',{ name:/Create User/});
  getUserNameUniqueErrorMsg = () => cy.contains('User name is already taken');
  getPasswordMatchErrorMsg = () => cy.contains("Password didn't match");
  getNulErrorMsg = () => cy.contains('"null" is prohibited as a full name for security reasons');

  typeUserName(userName) {
    this.getUserName().type(userName);
  }

  typePassword(password) {
    this.getPassword().should('be.visible').and('be.enabled').type(password);
  }

  typeConfirmPassword(confirmPassword) {
    this.getConfirmPassword().type(confirmPassword);
  }

  typeEmail(email) {
    this.getEmail().type(email);
  }

  clickCreateUserBtn() {
    this.getCreateUserBtn().click();
  }

  checkUserNameUniqueErrorMsg() {
    this.getUserNameUniqueErrorMsg().should('not.exist');
    return this;
  }

  checkPasswordMatchErrorMsg() {
    this.getPasswordMatchErrorMsg().should('not.exist');
    return this;
  }

  checkNulErrorMsg() {
    this.getNulErrorMsg().should('not.exist');
    return this;
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