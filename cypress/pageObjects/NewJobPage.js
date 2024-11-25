

class NewJobPage
{
   getItemNameInputField = () => cy.get("#name.jenkins-input")
   getItemNameInvalidErrorMessage = () => cy.get("#itemname-invalid")


   typeNewItemName(name) {
      this.getItemNameInputField().type(name);
      return this;
   };


}
export default NewJobPage