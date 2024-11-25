/// <reference types="cypress" />
import NewJobPage from "./NewJobPage"

class DashboardPage {

    getNewItemLink = ()=>  cy.get('a[href="/view/all/newJob"]')

    clickNewItemMenuLink() {
        this.getNewItemLink().click({ force: true });
        return new NewJobPage();
    }

    addNewProj()
    {
        this.getNewItemLink().click()
        return new NewJobPage()
    }
}
export default DashboardPage