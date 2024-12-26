/// <reference types="cypress"/>

import DashboardPage from '../pageObjects/DashboardPage';
import ManageJenkinsPage from '../pageObjects/ManageJenkinsPage';
import SecurityUsersPage from '../pageObjects/SecurityUsersPage';
import AddUserPage from '../pageObjects/AddUserPage';
import LoginPage from "../pageObjects/LoginPage";
import Header from "../pageObjects/Header";
import configurePageData from "../fixtures/configurePageData.json";

const dashboardPage = new DashboardPage();
const manageJenkinsPage = new ManageJenkinsPage();
const securityUsersPage = new SecurityUsersPage();
const addUserPage = new AddUserPage();
const loginPage = new LoginPage();
const header = new Header();
const LOCAL_PORT = Cypress.env('local.port');
const LOCAL_HOST = Cypress.env('local.host');
let endPoint = configurePageData.userStatusEndpoint;
let endPointParams = 'baseName=jenkins.dialogs&_=' 


describe('US_13.001 | Create new User', () => {
  let userName = 'Simon';
  const password = 'Password';
  const email = 'test@mail.com';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  

  userName = userName.toLowerCase();

  it('TC_13.001.01 | Create new User via Manage Jenkins left side menu', () => {
    
    cy.intercept('GET',`http://${LOCAL_HOST}:${LOCAL_PORT}/${endPoint}?${endPointParams}*`).as('autorization');
    
    cy.log('Navigate through the application');
    dashboardPage.clickManageJenkins();
    manageJenkinsPage.clickUsersIcon();
    securityUsersPage.clickCreateUser();

    cy.log('Creating user');
    addUserPage.createUser(userName, password, email);
    addUserPage
      .checkUserNameUniqueErrorMsg()
      .checkPasswordMatchErrorMsg()
      .checkNulErrorMsg();

    cy.log(`Verifying user "${userName}" was created successfully`);
    securityUsersPage.checkUserCreated(userName);

    cy.log('Log UI validation');
    dashboardPage.getLogOutButton().should('have.text', 'log out');
    dashboardPage.clickLogOutButton();        

    cy.log('Verifying login page is displayed');
    loginPage.getHeader().should('be.visible');
    loginPage.getSignInButton().should('be.visible');

    cy.log(`Logging back in with username: ${userName}`);
    loginPage
      .typeLogin(userName)
      .typePassword(password)
      .clickSignInButton();

    cy.wait('@autorization').then((newAutorization) => {
      expect(newAutorization.response.statusCode).to.eq(200);
    })

    cy.log(`Checking that username "${userName}" is visible on the dashboard`);
    dashboardPage.checkUserNameVisible(userName);
  });
});