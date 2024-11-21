/// <reference types="cypress"/>

describe("US_01.001 | FreestyleProject > Add description", () => {

  const newItemName = "Freestyle Project Name_1";
  const description = "New description for Freestyle Project";
  const newDescription = "Updated project description";

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

  it("TC_01.001.03 | Verify updating an existing description", () => {
   
    cy.get('[name="Submit"]').click();
    cy.get('#breadcrumbBar [href="/"]').click();
    cy.get('#projectstatus [href^="job/"]').first().click();
    cy.get('[id="description"]').should("exist");
    cy.get('[href="editDescription"]').click();
    cy.get(".jenkins-input").clear().type(newDescription);
    cy.get('[name="Submit"]').click();
    cy.get("#description")
      .should("be.visible")
      .and("have.text", newDescription);
  });

  it("TC_01.001.05_A | Add description to the new project", () => {
    cy.get('[name="description"]').type(description);
    cy.get('[name="Submit"]').click();

    cy.get('[class="jenkins-app-bar__content jenkins-build-caption"]').should('have.text', newItemName);
    cy.get('[id="description"]').should('be.visible').and('have.text', description);
  });

});
