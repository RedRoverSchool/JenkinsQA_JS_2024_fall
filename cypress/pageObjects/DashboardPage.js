/// <reference types="cypress" />
import { th } from "@faker-js/faker"
import NewJobPage from "./NewJobPage"
import LoginPage from "./LoginPage"

class DashboardPage {

    getNewItemLink = ()=>  cy.get('a[href="/view/all/newJob"]');
    getCreateJobBtn = () =>  cy.get('a[href="newJob"]').contains("Create a job");
    getMainPanel = () => cy.get('div#main-panel');
    getJobTable = () => cy.get("table.jenkins-table.sortable");
    getLogOutButton = () => cy.get('a[href="/logout"]')

    clickNewItemMenuLink() {
        this.getNewItemLink().click({ force: true });
        return new NewJobPage();
    }

    addNewProject()
    {
        this.getNewItemLink().click()
        return new NewJobPage()
    }

    clickCreateJobBtn()
    {
        this.getCreateJobBtn().click()
        return new NewJobPage()
    }

    clickLogOutButton() {
        this.getLogOutButton().click()
        return new LoginPage()
    }

    getSessionCookie(cookieName) {
        return cy.getCookies().then((cookies) => {
          return (cookies.find((cookie) => cookie.name.includes(cookieName))).value;
        });
    }
}
export default DashboardPage