/// <reference types="cypress"/>

import DashboardPage from '../pageObjects/DashboardPage';
import ManageJenkinsPage from '../pageObjects/ManageJenkinsPage';
import SecurityUsersPage from '../pageObjects/SecurityUsersPage';
import AddUserPage from '../pageObjects/AddUserPage';
import LoginPage from "../pageObjects/LoginPage";
import Header from "../pageObjects/Header";

const dashboardPage = new DashboardPage();
const manageJenkinsPage = new ManageJenkinsPage();
const securityUsersPage = new SecurityUsersPage();
const addUserPage = new AddUserPage();
const loginPage = new LoginPage();
const header = new Header();

describe('US_13.001 | Create new User', () => {
  let userName = 'Simon';
  const password = 'Password';
  const email = 'test@mail.com';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  userName = userName.toLowerCase();

  it('TC_13.001.01 | Create new User via Manage Jenkins left side menu', () => {
    // Navigate through the application
    dashboardPage.clickManageJenkins();
    manageJenkinsPage.clickUsersIcon();
    securityUsersPage.clickCreateUser();

    // Create a user
    addUserPage.createUser(userName, password, email);
    
    // User unique, password match, fullname
    addUserPage.checkUserNameUnique();
    addUserPage.checkPasswordMatch();
    addUserPage.checkNullError();

    //Check user was created
    securityUsersPage.checkUserCreated(userName);

    //Logout current user
    dashboardPage.getLogOutButton().should('have.text', 'log out');
    dashboardPage.clickLogOutButton();        

    //Check correct page, sign in button exist
    loginPage.getHeader().should('be.visible');
    loginPage.getSignInButton().should('be.visible');

    //Login with new username, password
    loginPage.typeLogin(userName);
    loginPage.typePassword(password);
    loginPage.clickSignInButton();

    //New user name is visible
    dashboardPage.checkUserNameVisible(userName);







  });
});