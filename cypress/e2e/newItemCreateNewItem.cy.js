/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

const btnNewItem = ":nth-child(1) > .task-link-wrapper > .task-link"
const btnDashboard = "li.jenkins-breadcrumbs__list-item a.model-link"
const jobFreeStyleProject = ".hudson_model_FreeStyleProject"

describe("US_00.000 | New Item > Create New item", () => {
    const btnCreateNewItem = 'a[href="/view/all/newJob"]';
    const randomItemName = faker.lorem.words();
    const btnOK = '#ok-button';
    const btnSave = 'button[name="Submit"]';
    const pageHeadline = 'h1.page-headline';
    const jobName = "Item_1";
    const sidebarJobName = "Item_2";
    const existingJobName = 'Item_1';
    const newJobName = 'Item_2';
    const wrongJobName = 'Item#1'
    const LOCAL_PORT = Cypress.env("local.port");
    const LOCAL_HOST = Cypress.env("local.host");


    it('TC_00.000.01| Create new item from "Create a job" button| Invalid data', () => {
        cy.get("a[href='newJob']").click();
        cy.url().should("include", "/newJob");
        cy.get('input[name="name"]').type(jobName);
        cy.get(jobFreeStyleProject).click();
        cy.get("#ok-button").click();
        cy.get(".jenkins-submit-button").click();
        cy.url().should("include", jobName);
        cy.get("#main-panel").should("contain", jobName).and("exist");
        cy.get(btnDashboard).first().click();
        cy.get(btnNewItem).click();
        cy.get('input[name="name"]').type(existingJobName);
        cy.get("#itemname-invalid").should(
            "have.class",
            "input-validation-message"
        );
        cy.get("#itemname-invalid").should("be.visible");
        cy.contains(/A job already exists with the name /);
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

    it('TC_00.000.03 | New Item > Create New item | From the "New Item" link in the left sidebar', () => {
        cy.get(':nth-child(1) > .task-link-wrapper > .task-link').click();
        cy.url().should('include', '/newJob');
        cy.get('input[name="name"]').type('test2');
        cy.get('.hudson_model_FreeStyleProject').click();
        cy.get('#ok-button').should('be.visible').click();
        cy.get('.jenkins-submit-button').click();
        cy.url().should('include', '/test2');
        cy.get('#main-panel').should('contain', 'test2').and('exist');
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

    it('TC_00.000.06 | Create new item from the "New Item" link in the left sidebar', () => {
        cy.get('span').contains('New Item').click()
        cy.get('input#name.jenkins-input').type(jobName)
        cy.get('.desc').eq(0).click()
        cy.get('#ok-button').click()
        cy.get('a#jenkins-home-link').click()

        cy.get('table.jenkins-table.sortable').contains(jobName).should('exist')
    })

    it('TC_00.000.07 | Verify new item can only be created using unique item names', () => {

        cy.get('span').contains('New Item').click()
        cy.get('input#name.jenkins-input').type(existingJobName)
        cy.get('.desc').eq(0).click()
        cy.get('#ok-button').click()
        cy.get('a#jenkins-home-link').click()
        cy.get('span').contains('New Item').click()
        cy.get('input#name.jenkins-input').type(existingJobName)
        cy.get('#itemname-invalid.input-validation-message').should('have.text', '» A job already exists with the name ‘Item_1’')
        cy.get('input[id="name"]').clear()
        cy.get('input#name.jenkins-input').type(newJobName)
        cy.get('span').contains('Freestyle project').click()
        cy.get('#ok-button').click()
        cy.get('a#jenkins-home-link').click()

        cy.get('table.jenkins-table.sortable').contains(newJobName).should('exist')
    })

    it('TC_00.000.08 | Verify item name does not contain any special characters', () => {

        cy.get('span').contains('New Item').click()
        cy.get('input#name.jenkins-input').type(wrongJobName)
        cy.get('#itemname-invalid.input-validation-message').should('have.text', '» ‘#’ is an unsafe character')
        cy.get('input#name.jenkins-input').clear()
        cy.get('input#name.jenkins-input').type(jobName)
        cy.get('span').contains('Freestyle project').click()
        cy.get('#ok-button').click()

        cy.get('a#jenkins-home-link').click()
        cy.get('table.jenkins-table.sortable').contains(jobName).should('exist')

        cy.get('table.jenkins-table.sortable').contains(jobName).then(($item) => {
            let itemName = $item.text();
            cy.wrap(itemName).should('not.match', /[!@#$%^&*[\]\/\\|;:<>,?]/);
        })
    })

    it('TC_00.000.09 | Verify New item can be created from "Create a job" button', () => {

        cy.get('span').contains('Create a job').click()
        cy.get('.jenkins-input').clear()
        cy.get('.jenkins-input').type(jobName)
        cy.get('span.label').contains('Freestyle project').click()
        cy.get('button').contains('OK').click()
        cy.get('button').contains('Save').click()
        cy.get('a.model-link').contains('Dashboard').click()

        cy.get('table.jenkins-table.sortable').contains(jobName).should("exist");
    })

    it('TC_00.000.10 | Verify that to create a new item, user should choose "an item type" first', () => {

        cy.get('span').contains('New Item').click()
        cy.get('input#name.jenkins-input').type(jobName)
        cy.get('#ok-button').contains('OK').should('be.disabled')
        cy.get('span').contains('Freestyle project').click()
        cy.get('#ok-button').contains('OK').should('be.enabled')
        cy.get('#ok-button').click()
        cy.get('a#jenkins-home-link').click()

        cy.get('table.jenkins-table.sortable').contains(jobName).should('be.visible')
    })

    it('TC_00.000.11 | Verify Error message appearance and its text when item name contains special characters', () => {
        cy.get('a[href="/view/all/newJob"]').click();
        cy.get('#name').type('New Project @#$ Name');

        cy.get('#itemname-invalid').should('have.text', '» ‘@’ is an unsafe character');
    });

    it('TC_00.000.12 | Verify redirection to the configure page for the selected item type after clicking "OK"', () => {

        cy.get('span').contains('New Item').click()
        cy.get('input#name.jenkins-input').type(jobName)
        cy.get('span.label').contains('Pipeline').click()
        cy.get('#ok-button').click()

        cy.url().should('include', '/configure')
        cy.get('button[data-section-id="pipeline"]').contains('Pipeline')
        cy.get('button[data-section-id="pipeline"]').should('be.visible')
    })

    it('TC_00.000.13 | Verify that after saving, new item is present on dashboard', () => {

        cy.get('span').contains('New Item').click()
        cy.get('input#name.jenkins-input').type(jobName)
        cy.get('span.label').contains('Freestyle project').click()
        cy.get('#ok-button').click()
        cy.get('button[name="Submit"]').contains('Save').click()
        cy.get('a#jenkins-home-link').click()

        cy.get('table.jenkins-table.sortable').contains(jobName).should('be.visible')
    })

    it('TC_00.000.14 | Verify the display of validation message if no item name is entered', () => {

        cy.get('span').contains('New Item').click()
        cy.get('input#name.jenkins-input').type(jobName)
        cy.get('input#name.jenkins-input').clear()

        cy.get('#itemname-required.input-validation-message').should('have.text', '» This field cannot be empty, please enter a valid name')
        cy.get('#ok-button').contains('OK').should('be.disabled')
    })

    it('TC_00.000.15 | Verify item name is displayed on the page after "Save" button is clicked', () => {
        cy.get(btnCreateNewItem).click();
        cy.get('#name').type(randomItemName);
        cy.get(jobFreeStyleProject).click();
        cy.get(btnOK).click();
        cy.get(btnSave).click();

        cy.get(pageHeadline).contains(randomItemName).should('be.visible');

        it('TC_00.000.16 | User can see new "item name" on dashboard after "Save button" is clicked', () => {
            cy.get('a.task-link[href="/view/all/newJob"]').click();
            cy.get('#name').type('New project')
            cy.get('.com_cloudbees_hudson_plugins_folder_Folder').click()
            cy.get('#ok-button').should('have.text', 'OK').click()
            cy.get('.jenkins-submit-button')
                .contains('Save')
                .should('be.visible')
                .click()
            cy.get('h1:has(svg[tooltip="Folder"])').should('be.visible')
            cy.get('ol#breadcrumbs li a.model-link')
                .contains('Dashboard')
                .should('be.visible')
                .click()
            cy.get('a[href="job/New%20project/"]').should('be.visible')

        })
    })
})