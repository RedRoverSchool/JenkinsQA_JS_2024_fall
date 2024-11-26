import header from "../fixtures/pomFixtures/header.json"

class JobPage {
  getHeadlineIndex = () => cy.get("h1.job-index-headline.page-headline");
  
  getTextFromHeadlineIndex()
   {
     return this.getHeadlineIndex().then($el => {
        return $el.text()
      });
   }
     
  getProjectDescription = () => cy.get('[id="description"]');
}
export default JobPage