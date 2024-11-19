/// <reference types="cypress"/>

describe("US_01.002 | FreestyleProject > Rename Project", () => {
    
  it("TC_01.002-01 | FreestyleProject > Rename Project > User receives an Error when the new name is invalid", () => {
    let project1Name = "Project1";
    let project2Name = "Project2";
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
});
