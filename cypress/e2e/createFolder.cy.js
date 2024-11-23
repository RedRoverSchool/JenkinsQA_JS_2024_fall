/// <reference types="cypress"/>
describe("US_00.004 | New item > Create Folder", () => {
  it("TC_00.004.01_A | Verify a User can create Folder from sidebar menu using New Item menu link, with unique name and default configuration", () => {
    
    cy.get(":nth-child(1) > .task-link-wrapper > .task-link").click();
    cy.get('input[id="name"]').type("New Folder");
    cy.get(".com_cloudbees_hudson_plugins_folder_Folder").click();
    cy.get("#ok-button").contains("OK").click();
    cy.get(".jenkins-submit-button").click();
    cy.get("h1").contains("New Folder");
    cy.get("#jenkins-name-icon").click();
    cy.get("span")
      .contains("New Folder")
      .trigger("mouseover")
      .should("be.visible");
    cy.get(".jenkins-table__link > .jenkins-menu-dropdown-chevron").click({
      force: true,
    });
    cy.get("button.jenkins-dropdown__item").click();
    cy.get(".jenkins-button--primary").click();
  });
});
