

class NewJobPage
{
   getItemNameTextField = () => cy.get("#name.jenkins-input")
   getItemNameInvalidErrorMessage = () => cy.get("#itemname-invalid")

   
   typeNewItemName(name) {
      this.getItemNameTextField().type(name);
      return this;
   };


}
export default NewJobPage