import header from "../fixtures/pomFixtures/headerData.json"

class JobPage {

  getHeadlineIndex = () => cy.get("#main-panel h1");
  getProjectDescription = () => cy.get('[id="description"]');
  
  getTextFromHeadlineIndex() {
    return this.getHeadlineIndex().then($el => {
      return $el.text()
    });
  }
     
}
export default JobPage