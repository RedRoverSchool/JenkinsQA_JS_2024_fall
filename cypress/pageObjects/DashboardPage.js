/// <reference types="cypress" />
import JobPage from "./JobPage";
import NewJobPage from "./NewJobPage"

class DashboardPage {

    getNewItemLink = () => cy.get('a[href="/view/all/newJob"]')
    projectStatusTable = () => cy.get('#projectstatus')
    getAllProjectNames = () => cy.get('.jenkins-table__link span')

    clickNewItemMenuLink() {
        this.getNewItemLink().click({ force: true });
        return new NewJobPage();
    }

    addNewProj() {
        this.getNewItemLink().click()
        return new NewJobPage()
    }

    clickProjectName(name) {
        this.projectStatusTable().contains(name).click()
        return new JobPage()
    }
}
export default DashboardPage