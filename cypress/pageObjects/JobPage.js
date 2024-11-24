import header from "../fixtures/pomFixtures/header.json"
class JobPage
{
   getHeadlineIndex = () => cy.get('h1.job-index-headline.page-headline')
}
export default JobPage