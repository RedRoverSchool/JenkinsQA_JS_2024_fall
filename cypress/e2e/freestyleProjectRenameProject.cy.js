/// <reference types="cypress"/>

const newItemBtn = '[href="/view/all/newJob"]';
const itemNameField = ".jenkins-input";
const freeStyleProjectItem = ".hudson_model_FreeStyleProject";
const okBtn = "#ok-button";
const submitBtn = "[name='Submit']";
const dashboardBtn = '#breadcrumbs a[href="/"]';
const projectStatus = '#projectstatus [href^="job/"] span';
const renameField = '[name="newName"]';
const renameBtn = '[href*="rename"]';

let project1Name = "Project1";
let project2Name = "Project2";

describe("US_01.002 | FreestyleProject > Rename Project", () => {
  it("TC_01.002-01 | FreestyleProject > Rename Project > User receives an Error when the new name is invalid", () => {
    cy.get("span.task-link-text").contains("New Item").click({ force: true });
    cy.wait(500);
    cy.get(".jenkins-input#name").type(project1Name);
    cy.get("span.label").contains("Freestyle project").click();
    cy.get("button").contains("OK").click();
    cy.get("button").contains("Save").click();
    cy.get("h1.job-index-headline.page-headline").should(
      "have.text",
      project1Name
    );
    cy.get('li a.model-link[href="/"]').click();
    cy.get("span.task-link-text").contains("New Item").click({ force: true });
    cy.wait(500);
    cy.get(".jenkins-input#name").type(project2Name);
    cy.get("span.label").contains("Freestyle project").click();
    cy.get("button").contains("OK").click();
    cy.get("button").contains("Save").click();
    cy.get("h1.job-index-headline.page-headline").should(
      "have.text",
      project2Name
    );
    cy.get('li a.model-link[href="/"]').click();
    cy.get("a.jenkins-table__link span").contains(project1Name).click();
    cy.get(".task-link-text").contains("Rename").click({ force: true });
    cy.url().should("include", `${project1Name}/confirm-rename`);
    cy.get("div.warning").should(
      "have.text",
      "The new name is the same as the current name."
    );
    cy.get('button[name="Submit"]').click();
    cy.get("div h1").should("have.text", "Error");
    cy.get("div p").should(
      "have.text",
      "The new name is the same as the current name."
    );
    cy.go("back");
    cy.url().should("include", `${project1Name}/confirm-rename`);
    cy.get('input[checkdependson="newName"]').clear().type(project2Name);
    cy.get('button[name="Submit"]').click();
    cy.get("div h1").should("have.text", "Error");
    cy.get("div p").should(
      "have.text",
      `The name “${project2Name}” is already in use.`
    );
    cy.go("back");
    cy.url().should("include", `${project1Name}/confirm-rename`);
    cy.get('input[checkdependson="newName"]').clear();
    cy.get('button[name="Submit"]').click();
    cy.get("div h1").should("have.text", "Error");
    cy.get("div p").should("have.text", `No name is specified`);
    cy.go("back");
    cy.url().should("include", `${project1Name}/confirm-rename`);
    const specialChars = `!@#$%^*|[]\\:;\?/`.split("");
    specialChars.forEach((char) => {
      cy.get('input[checkdependson="newName"]').clear().type(`test${char}123`);
      cy.get('button[name="Submit"]').click();
      cy.get("div h1").should("have.text", "Error");
      cy.get("div p").should("have.text", `‘${char}’ is an unsafe character`);
      cy.go("back");
      cy.url().should("include", `${project1Name}/confirm-rename`);
    });
    cy.get('input[checkdependson="newName"]').clear().type("test.");
    cy.get('button[name="Submit"]').click();
    cy.get("div h1").should("have.text", "Error");
    cy.get("div p").should("have.text", "A name cannot end with ‘.’");
  });

  it("TC_01.002.02 | Rename a project from the Project Page", () => {
    cy.get(newItemBtn).click();
    cy.get(itemNameField).type(project1Name);
    cy.get(freeStyleProjectItem).click();
    cy.get(okBtn).click();
    cy.get(submitBtn).click();
    cy.get(dashboardBtn).click();
    cy.get(projectStatus).first().click();
    cy.get(renameBtn).click();
    cy.get(renameField).clear().type(project2Name);
    cy.get(submitBtn).click();
    cy.url().should("include", project2Name);
    cy.get("#main-panel h1").should("have.text", project2Name);
    cy.get(dashboardBtn).click();
    cy.get(projectStatus).should("have.text", project2Name);
  });

  it("TC_01.002-04 | Rename a project name from the Dashboard page", () => {
    let nameItem = 'RenameProject'
    let newNameItem = 'ProjectRenamed'
  // Preconditions
    // Create new item nameJob
    cy.get("a[href$='/newJob']").click();
    cy.get('[name="name"]').type(nameItem);
    cy.get("li.hudson_model_FreeStyleProject").click();
    cy.get("button.jenkins-button.jenkins-button--primary").click();
    cy.get('[name="Submit"]').click();
    cy.get("a:contains('Dashboard')").click();
  // Steps
    // Navigate drop-down menu
    cy.get(`a[href$='/${nameItem}/'].jenkins-table__link.model-link.inside`)
      .realHover()
      .realClick({ position: "right" })
      .get('a.jenkins-dropdown__item[href$="/confirm-rename"]')
      .click();
    // Check URL
    cy.url().should('include', '/confirm-rename')
    cy.get('input[name="newName"]').clear().type(newNameItem);
    cy.get('button[name="Submit"]').click();
  // Checks block
    cy.reload();
    cy.url().should('include', newNameItem)
    cy.get(`li > a[href$="/${newNameItem}/"]`).contains(newNameItem)
    cy.get('h1.job-index-headline.page-headline').contains(newNameItem)
    cy.get("a:contains('Dashboard')").click();
    cy.get('td > a > span').contains(newNameItem);
  });

});
