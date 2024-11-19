/// <reference types="cypress" />
describe("New Item > Create Pipeline Project", () => {
  it("New Item > Create Pipeline Project | Special characters are not allowed in the project name", () => {
    cy.get(".task-link-text").contains("New Item").click({ force: true });
    cy.get("#name.jenkins-input").type("New<>Name");
    cy.get("#itemname-invalid")
      .should("have.text", "» ‘<’ is an unsafe character")
      .and("have.css", "color", "rgb(230, 0, 31)");
  });
});