/// <reference types="cypress"/>

import DashboardPage from '../pageObjects/DashboardPage';
import ManageJenkinsPage from '../pageObjects/ManageJenkinsPage';
import SecurityUsersPage from '../pageObjects/SecurityUsersPage';
import AddUserPage from '../pageObjects/AddUserPage';

const dashboardPage = new DashboardPage();
const manageJenkinsPage = new ManageJenkinsPage();
const securityUsersPage = new SecurityUsersPage();
const addUserPage = new AddUserPage();

describe('US_13.001 | Create new User', () => {
  const userName = 'userName';
  const password = 'Password';
  const email = 'test@mail.com';

  it('TC_13.001.01 | Create new User via Manage Jenkins left side menu', () => {
    // Navigate through the application
    dashboardPage.clickManageJenkins();
    manageJenkinsPage.clickUsersIcon();
    securityUsersPage.clickCreateUser();

    // Use a single method to create a user
    addUserPage.createUser(userName, password, email);
  });
});