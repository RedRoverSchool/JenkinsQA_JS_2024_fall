/// <reference types="cypress" />

import NewJobPage from "./NewJobPage";

class DashboardPage {

    getNewItemMenuLink = () => cy.get('a[href="/view/all/newJob"]');
    
    clickNewItemMenuLink() {
        this.getNewItemMenuLink().click({ force: true });
        return new NewJobPage();
    }
}; 
export default DashboardPage;