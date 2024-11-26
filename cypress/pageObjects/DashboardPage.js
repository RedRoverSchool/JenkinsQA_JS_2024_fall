/// <reference types="cypress" />
import NewJobPage from "./NewJobPage"

class DashboardPage {

    getNewItemLink = ()=>  cy.get('a[href="/view/all/newJob"]');
    getCreateJobBtn = () =>  cy.get('a[href="newJob"]').contains("Create a job");
    getMainPanel = () => cy.get('div#main-panel');
    getJobTable = () => cy.get("table.jenkins-table.sortable");

    clickNewItemMenuLink() {
        this.getNewItemLink().click({ force: true });
        return new NewJobPage();
    }

    addNewProj()
    {
        this.getNewItemLink().click()
        return new NewJobPage()
    }

    clickCreateJobBtn()
    {
        this.getCreateJobBtn().click()
        return new NewJobPage()
    }
}
export default DashboardPage