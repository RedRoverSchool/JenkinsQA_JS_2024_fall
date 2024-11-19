/// <reference types="cypress"/>

describe("US_01.001 | FreestyleProject > Add description", () => {
  
  const newItemName = "Freestyle Project Name_1";
  const description = "New description for Freestyle Project";

  beforeEach(() => {
    cy.get('[href="/view/all/newJob"]').click();
    cy.get(".jenkins-input").type(newItemName);
    cy.get(".hudson_model_FreeStyleProject").click();
    cy.get("#ok-button").click();
  });

  it("TC_01.001.01 | Add a description when creating a project", () => {
    cy.get('[name="description"]').type(description);
    cy.get('[name="Submit"]').click();
    cy.url().should("include", "/job");

    cy.get(".page-headline").should("have.text", newItemName);
    cy.get('[id="description"]')
      .should("be.visible")
      .and("have.text", description);
  });

  it("TC_01.001.02 | Add a Description to an Existing Project", () => {
    cy.get('[name="Submit"]').click();
    cy.get('#breadcrumbs a[href="/"]').click();
    cy.get(".model-link.inside").click();
    cy.get('[href="editDescription"]').click();
    cy.get('textarea[name="description"]').type(description);
    cy.get('[name="Submit"]').click();

    cy.get('[id="description"]')
      .should("be.visible")
      .and("have.text", description);
  });
});
