/// <reference types="cypress" />

import DashboardPage from "../pageObjects/DashboardPage"
import LoginPage from "../pageObjects/LoginPage";
import dashboardPageData from "../fixtures/dashboardPageData.json"
import Header from "../pageObjects/Header";

describe('US_14.003 | Header > Log out option', () => {

  const dashboardPage = new DashboardPage();
  const loginPage = new LoginPage();
  const header = new Header(); 

  it("TC_14.003.03 | All session-related cookies are cleared", () => {
    dashboardPage.getSessionCookie(dashboardPageData.sessionIdCookie).then((sessionCookie) => {
      dashboardPage.clickLogOutButton()
      loginPage.getSessionCookie(dashboardPageData.sessionIdCookie)
               .then((updatedSessionCookie) => {
                  expect(sessionCookie).not.to.equal(updatedSessionCookie)
                });
    });
  });

  it("RF_14.003.04 | Verify Log out button is seen and works properly.", () => {
    dashboardPage.clickLogOutButton(); 
  })

  it('TC_14.003.05 | Header > Log out option | Verify user log out the current session on click "Log out" link.', () => {
    dashboardPage.getLogOutButton().contains('log out').should('be.visible');
    dashboardPage.clickLogOutButton();       
    loginPage.getHeader().contains('Sign in to Jenkins').should('be.visible');
    loginPage.getSignInButton().should('be.visible');
  });

});