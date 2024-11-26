import header from "../fixtures/pomFixtures/header.json"
import DashboardPage from "./DashboardPage";

class JobPage {
  getHeadlineIndex = () => cy.get("h1.job-index-headline.page-headline");
  getProjectDescription = () => cy.get('[id="description"]');
  getDashboardLink = () => cy.get('a[href="/"].model-link')
  deleteProjectButton = () => cy.get('a[data-title="Delete Project"]')
  CancelButton = () => cy.get('button[data-id="cancel"]')
  
  getTextFromHeadlineIndex() {
    return this.getHeadlineIndex().then($el => {
      return $el.text()
    });
  }

  clickDashboardLink(){
    this.getDashboardLink().click()
    return new DashboardPage()
  }
  
  clickDeleteProjectButton() {
    this.deleteProjectButton().click()
    return new JobPage()
  }

  clickCancelButton() {
    this.CancelButton().click()
    return new JobPage()
  }
}
export default JobPage