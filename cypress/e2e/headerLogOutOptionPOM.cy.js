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

  it('RF_14.003.05 | Header > Log out option | Verify user log out the current session on click "Log out" link.', () => {
    dashboardPage.getLogOutButton().should('have.text', 'log out');
    dashboardPage.clickLogOutButton();        
    loginPage.getHeader().should('be.visible');
    loginPage.getSignInButton().should('be.visible');
  });

  it('TC_14.003.06 | The logout process should complete within 1 second under normal conditions', () => {
      const startTime = performance.now(); 
      dashboardPage.clickLogOutButton();   
      cy.url().should('include', '/login'); 
      const endTime = performance.now();   
      const duration = endTime - startTime;
      expect(duration).to.be.lessThan(1000);
      cy.log(`Logout process completed in ${duration} ms`);
    });

    it('TC_14.003.07 | Verify "Log out" button is keyboard-navigable', () => {     
      header.tabAndClickLogoutButton();
      loginPage.verifyRedirectionToLoginPage();
    });
});
