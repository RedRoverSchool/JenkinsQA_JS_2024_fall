 /// <reference types="cypress" />

import {sessionIdCookie} from "../fixtures/dashboardPage.json"
import DashboardPage from "../pageObjects/DashboardPage"
import LoginPage from "../pageObjects/LoginPage";

 describe('US_14.003 | Header > Log out option', () => {

  const dashboardPage = new DashboardPage();
  const loginPage = new LoginPage();

  it.only("TC_14.003.03 | All session-related cookies are cleared", () => {
    dashboardPage.getSessionCookie(sessionIdCookie).then((sessionCookie) => {
      dashboardPage.clickLogOutButton();
      loginPage.checkSessionCookieChanged(sessionCookie, sessionIdCookie);
    });
  });
});
