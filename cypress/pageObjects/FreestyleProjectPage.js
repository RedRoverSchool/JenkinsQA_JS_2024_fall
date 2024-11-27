/// <reference types="cypress" />
import DashboardPage from "./DashboardPage";

class FreestyleProjectPage {

  getDashboardLink = () => cy.get('a[href="/"].model-link')
  deleteProjectButton = () => cy.get('a[data-title="Delete Project"]')
  cancelButton = () => cy.get('button[data-id="cancel"]')

  // getTextFromHeadlineIndex() {
  //   return this.getHeadlineIndex().then($el => {
  //     return $el.text()
  //   });
  // }

  clickDashboardLink(){
    this.getDashboardLink().click()
    return new DashboardPage()
  }

  clickDeleteProjectButton() {
    this.deleteProjectButton().click()
    return this
  }

  clickCancelButton() {
    this.cancelButton().click()
    return this
  }
}

export default FreestyleProjectPage;