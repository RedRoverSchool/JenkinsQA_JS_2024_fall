import NewJobPage from "./NewJobPage"

class DashboardPage
{
    getNewItemLink = ()=>  cy.get('a[href="/view/all/newJob"]')



    addNewProj()
    {
        this.getNewItemLink().click()
        return new NewJobPage()
    }
}
export default DashboardPage