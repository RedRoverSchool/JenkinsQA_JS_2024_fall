/// <reference types="cypress"/>

describe("US_01.001 | FreestyleProject > Add description", () => {
  const newItemName = "Freestyle Project Name_1";
  const description = "New description for Freestyle Project";
  it("TC_01.001.01 | Add a description when creating a project", () => {
    
    cy.get('[href="/view/all/newJob"]').click();
    cy.get(".jenkins-input").type(newItemName);
    cy.get("#add-item-panel").contains("Freestyle project").click();
    cy.get("#ok-button").click();
    cy.get('[name="description"]').type(description);
    cy.get('[name="Submit"]').click();
    cy.url().should("include", "/job");

    cy.get(".page-headline").should("have.text", newItemName);
    cy.get('[id="description"]')
      .should("be.visible")
      .and("have.text", description);
  });
});
