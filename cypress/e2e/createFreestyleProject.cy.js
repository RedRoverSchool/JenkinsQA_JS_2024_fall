///<reference types="cypress" />
describe("US_00.001 |New item > Create Freestyle Project", () => {
  it("TC_00.001.015 | New item > Create Freestyle Project > User can create and save new job Freestyle project", () => {
    //log in
    cy.visit("http://localhost:8080/login?from=%2F");
    cy.get("input#j_username").type("admin");
    cy.get("input#j_password").type("admin");
    cy.get('button[type="submit"]').click();
    //check + New Item on main page
    cy.get(".task-link-text").contains("New Item").click({ force: true });
    cy.get(".jenkins-input").type("Test");
    cy.get(".label").first().click();
    cy.get("#ok-button").click();
    cy.get(".jenkins-submit-button").click();
    cy.get("h1").should("have.text", "Test");
  });
});
