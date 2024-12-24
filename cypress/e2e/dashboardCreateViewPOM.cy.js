/// <reference types="cypress"/>

import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import FreestyleProjectPage from "../pageObjects/FreestyleProjectPage";
import Header from "../pageObjects/Header";
import MyViewsPage from "../pageObjects/MyViewsPage";

import myViewsPageData from "../fixtures/myViewsPageData.json";
import genData from "../fixtures/genData";

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const freestyleProjectPage = new FreestyleProjectPage();
const header = new Header();
const myViewsPage = new MyViewsPage();

describe("US_16.002 | Dashboard > Create View", () => {
  let project = genData.newProject();
  let folder = genData.newProject();
  let view = genData.newProject();
  let newView = genData.newProject();

  beforeEach(() => {
    dashboardPage.clickNewItemMenuLink();
    newJobPage
      .typeNewItemName(project.name)
      .selectFreestyleProject()
      .clickOKButton();
    freestyleProjectPage.clickSaveButton();
    header.clickJenkinsLogo();

    dashboardPage.clickNewItemMenuLink();
    newJobPage.typeNewItemName(folder.name).selectFolder().clickOKButton();
    freestyleProjectPage.clickSaveButton();
    header.clickJenkinsLogo();
  });


  it("TC_16.002.01 Create view from the Dashboard page", () => {
    dashboardPage.clickAddViewLink()
                 .typeViewName(view.name)
                 .clickListViewRadio()
                 .clickCreateViewButton()
                 .clickSubmitViewCreationButton()

    cy.url().then((url) => {
      const normalizedUrl = url.replace("%20", " ");
      expect(normalizedUrl).to.contain(view.name);
    });
    dashboardPage
      .getCurrentViewBreadcrumbsItem()
      .should("have.text", view.name);
    
      header.clickJenkinsLogo;
      dashboardPage.getViewTab(view.name).should("be.visible");
  });

  
  it("TC_16.002.03 | Verify descending sorting in the columns", () => {

    let pipeline = genData.newProject();
    let orgFolder = genData.newProject();

    cy.log("Creating more items on the dashboard");
      dashboardPage.clickNewItemMenuLink();
      newJobPage.typeNewItemName(pipeline.longName)
                .selectPipelineProject()
                .clickOKButton();
      header.clickJenkinsLogo();

      dashboardPage.clickNewItemMenuLink();
      newJobPage.typeNewItemName(orgFolder.longName)
                .selectOrganizationFolder()
                .clickOKButton();
      header.clickJenkinsLogo();

    cy.log("Creating new view");
      myViewsPage.clickAddNewViewLink()
                .typeViewName(view.name)
                .clickMyViewRadio()
                .clickCreateButton();
    
    cy.log("Hitting on sorting arrow to sort in desc order")
       dashboardPage.clickSortingArrowOfNameColumn();

    cy.log("getting an array of all names, sorting the array in desc order, compare initial and sorted arrays");
      dashboardPage.getAllItemNamesFromNameColumn().then(($cells) => {
        const textValues = $cells
            .map((index, cell) => Cypress.$(cell).text())
            .get()
            .map((value) => value.toLowerCase());
        cy.log(textValues);
        const sortedTextValues = [...textValues].sort().reverse();
        cy.log(sortedTextValues);
        expect(textValues).to.deep.equal(sortedTextValues);
      });
  });

  it("TC_16.002.04 | Only selected jobs are displayed in the view after it is saved", () => {
    
    dashboardPage.clickAddViewLink()
    myViewsPage.typeViewName(view.name)
               .clickListViewRadio()
               .clickCreateButton()
               .selectJobCheckbox(project.name)
               .clickOKButton()

    dashboardPage.getItemName().should('have.text', project.name)         
  });

  it('TC_16.002.05 | Dashboard > Create View | Create "List view" from Dashboard', ()=> {

    dashboardPage.clickAddViewLink()
                 .typeViewName(project.name)
                 .clickListViewRadio()
                 .clickViewTypeOkButton()
                 .clickSubmitListViewCreationButton()

    cy.url().should('include', `/view/${project.name}`)
    dashboardPage.getActiveTab().should('have.text', project.name)
  });

  it('TC_16.002.07 | Verify the possibility to configure different column sets for different views', () => {

    cy.log('Creating the 1st View');
    dashboardPage.clickAddViewLink();
    myViewsPage.typeViewName(view.name)
               .clickListViewRadio()
               .clickCreateButton()
               .selectJobCheckbox(project.name)
               .selectJobCheckbox(folder.name)
               .clickAddColumnButton()
               .selectColumnDropdownOption(myViewsPageData.columnName.lastStable)
               .clickOKButton();

    cy.log('Creating the 2nd View');
    dashboardPage.clickAddViewLink();
    myViewsPage.typeViewName(newView.name)
               .clickListViewRadio()
               .clickCreateButton()
               .selectJobCheckbox(project.name)
               .selectJobCheckbox(folder.name)
               .clickDeleteWeatherColumnButton()
               .clickAddColumnButton()
               .selectColumnDropdownOption(myViewsPageData.columnName.projectDescription)
               .clickOKButton();

    cy.log('Verifying that the 1st View contains the "Weather" column, includes the "Last Stable" column, but lacks the "Description" column');
    myViewsPage.clickViewTab(view.name);
    myViewsPage.getWeatherColumn().should('be.visible').and('contain.text', 'W');
    myViewsPage.getLastStableColumn().should('be.visible').and('contain.text', 'Last Stable');
    myViewsPage.getDescriptionColumn().should('not.exist');

    cy.log('Verifying that the 2nd View does not contain the "Weather" column, includes the "Description" column, but lacks the "Last Stable" column');
    myViewsPage.clickViewTab(newView.name);
    myViewsPage.getWeatherColumn().should('not.exist');
    myViewsPage.getDescriptionColumn().should('be.visible').and('contain.text', 'Description');
    myViewsPage.getLastStableColumn().should('not.exist');
  });

  it('TC_16.002.08 | Verify that only selected columns are displayed in the saved view', () => {

    cy.log('Creating the View');
    dashboardPage.clickAddViewLink();
    myViewsPage.typeViewName(view.name)
               .clickListViewRadio()
               .clickCreateButton()
               .selectJobCheckbox(project.name)
               .selectJobCheckbox(folder.name)
               .deleteDefaultColumns();
    myViewsPage.clickOKButton()
               .clickEditViewMenuOption()
               .clickAddColumnButton().selectColumnDropdownOption(myViewsPageData.columnName.status)
               .clickAddColumnButton().selectColumnDropdownOption(myViewsPageData.columnName.weather)
               .clickAddColumnButton().selectColumnDropdownOption(myViewsPageData.columnName.name_1)
               .clickOKButton();
  
    cy.log('Verifying that the View contains the "Status", the "Weather" and the "Name" columns');
    myViewsPage.clickViewTab(view.name);
    myViewsPage.getStatusColumn().should('be.visible').and('contain.text', 'S');
    myViewsPage.getWeatherColumn().should('be.visible').and('contain.text', 'W');
    myViewsPage.getNameColumn().should('be.visible').and('contain.text', 'Name');
  });
});
