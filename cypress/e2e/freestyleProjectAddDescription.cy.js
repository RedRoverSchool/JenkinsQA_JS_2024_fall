/// <reference types="cypress"/>

import { faker } from "@faker-js/faker";

const projectName = `${faker.hacker.adjective()} ${faker.hacker.noun()}}`;
const projectDescription = faker.lorem.sentence();
const projectNewDescription = faker.lorem.sentence(2);

describe("US_01.001 | FreestyleProject > Add description", () => {
  const newItemBtn = '[href="/view/all/newJob"]';
  const itemNameField = ".jenkins-input";
  const freeStyleProjectItem = ".hudson_model_FreeStyleProject";
  const okBtn = "#ok-button";
  const submitBtn = "[name='Submit']";
  const dashboardBtn = '#breadcrumbs a[href="/"]';
  const description = '[id="description"]';
  const editDescription = '[href="editDescription"]';

  beforeEach(() => {
    cy.get(newItemBtn).click();
    cy.get(itemNameField).type(projectName);
    cy.get(freeStyleProjectItem).click();
    cy.get(okBtn).click();
  });

  it("TC_01.001.01 | Add a description when creating a project", () => {
    cy.get('[name="description"]').type(projectDescription);
    cy.get(submitBtn).click();
    cy.url().should("include", "/job");

    cy.get(".page-headline").should("have.text", projectName);
    cy.get(description)
      .should("be.visible")
      .and("have.text", projectDescription);
  });

  it("TC_01.001.02 | Add a Description to an Existing Project", () => {
    cy.get(submitBtn).click();
    cy.get(dashboardBtn).click();
    cy.get(".model-link.inside").click();
    cy.get(editDescription).click();
    cy.get('textarea[name="description"]').type(projectDescription);
    cy.get(submitBtn).click();

    cy.get(description)
      .should("be.visible")
      .and("have.text", projectDescription);
  });

  it("TC_01.001.03 | Verify updating an existing description", () => {
    cy.get(submitBtn).click();
    cy.get(dashboardBtn).click();
    cy.get('#projectstatus [href^="job/"]').first().click();
    cy.get(description).should("exist");
    cy.get(editDescription).click();
    cy.get(itemNameField).clear().type(projectNewDescription);
    cy.get(submitBtn).click();
    cy.get(description)
      .should("be.visible")
      .and("have.text", projectNewDescription);
  });

  it("TC_01.001.05_A | Add description to the new project", () => {
    cy.get('[name="description"]').type(projectDescription);
    cy.get('[name="Submit"]').click();

    cy.get('[class="jenkins-app-bar__content jenkins-build-caption"]').should(
      "have.text",
      projectName
    );
    cy.get("#description")
      .should("be.visible")
      .and("have.text", projectDescription);
  });
});
