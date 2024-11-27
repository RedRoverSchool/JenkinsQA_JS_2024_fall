 /// <reference types="cypress" />

import DashboardPage from "../pageObjects/DashboardPage"
import LoginPage from "../pageObjects/LoginPage"
import {sessionIdCookie} from "../fixtures/dashboardPageData.json"
 
describe('US_14.003 | Header > Log out option', () => {
 
  const dashboardPage = new DashboardPage()
  const loginPage = new LoginPage()
 
  it("TC_14.003.03 | All session-related cookies are cleared", () => {
    dashboardPage.getSessionCookie(sessionIdCookie).then((sessionCookie) => {
      dashboardPage.clickLogOutButton()
      loginPage.getSessionCookie(sessionIdCookie).then((updatedSessionCookie) => {
        expect(sessionCookie).not.to.equal(updatedSessionCookie)
      });
    });
  });
});