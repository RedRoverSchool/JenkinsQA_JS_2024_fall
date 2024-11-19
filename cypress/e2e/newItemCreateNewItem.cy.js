/// <reference types="cypress" />

describe("US_00.000 | New Item > Create New item", () => {
    const jobName = "Item_1";
    const sidebarJobName = "Item_2";
    const LOCAL_PORT = Cypress.env("local.port");
    const LOCAL_HOST = Cypress.env("local.host");

    it('TC_00.000-01|New Item > Create New item | Create new item from "Create a job" button|Invalid data', () => {
        cy.get("a[href='newJob']").click();
        cy.url().should("include", "/newJob");
        cy.get('input[name="name"]').type("test2");
        cy.get(".hudson_model_FreeStyleProject").click();
        cy.get("#ok-button").click();
        cy.get(".jenkins-submit-button").click();
        cy.url().should("include", "/test2");
        cy.get("#main-panel").should("contain", "test2").and("exist");
        cy.get("li.jenkins-breadcrumbs__list-item a.model-link").first().click();
        cy.get(":nth-child(1) > .task-link-wrapper > .task-link").click();
        cy.get('input[name="name"]').type("test2");
        cy.get("#itemname-invalid").should(
            "have.class",
            "input-validation-message"
        );
        cy.get("#itemname-invalid").should("be.visible");
        cy.contains(/already exists with the name ‘test2’/);
        cy.get('input[name="name"]').type("@@@@");
        cy.get("#itemname-invalid").should(
            "have.class",
            "input-validation-message"
        );
        cy.get("#itemname-invalid").should("be.visible");
        cy.contains(/is an unsafe character/);
        cy.get('input[name="name"]').click();
        cy.get("#itemname-required")
            .contains(/This field cannot be empty/)
            .should("have.class", "input-validation-message");
    });

    it('TC_00.000-02 | New Item > Create New item | Create new item from "Create a job" button', () => {
        cy.get("span").contains("jobName").should("not.exist");
        cy.get('a[href="newJob"]').contains("Create a job").click();
        cy.get("input#name.jenkins-input").type(jobName);
        cy.get(".desc").eq(0).click();
        cy.get("#ok-button").click();
        cy.get("a#jenkins-home-link").click();
        cy.get("table.jenkins-table.sortable").contains(jobName).should("exist");
    });

    it("TC_00.000-04 | New Item > Create New item | New item from left Sidebar", () => {
        cy.get("span").contains("New Item").click();
        cy.get("input#name").type(sidebarJobName);
        cy.get("span.label").contains("Freestyle project").click();
        cy.get("button#ok-button").click();
        cy.get('button[name="Submit"]').click();
        cy.get(".job-index-headline")
            .should("contain.text", sidebarJobName)
            .and("be.visible");
        cy.url().should("eq", `http://${LOCAL_HOST}:${LOCAL_PORT}/job/${sidebarJobName}/`);
    });

    it('TC_00.000.05 | Create new item from Dashboard dropdown menu', () => {
        cy.get('a.model-link').contains('Dashboard').realHover()
        cy.get('a[href="/"] .jenkins-menu-dropdown-chevron').should('be.visible')
            .click()
        cy.get('a.jenkins-dropdown__item ').each(($els) => {
            let eText = $els.text().trim()
            if (eText == 'New Item') { cy.wrap($els).click() }
        })
        cy.get('input#name.jenkins-input').type(jobName)
        cy.get('.desc').eq(0).click()
        cy.get('#ok-button').click()
        cy.get('a#jenkins-home-link').click()
        cy.get('table.jenkins-table.sortable').contains(jobName).should('exist')
    })
});
