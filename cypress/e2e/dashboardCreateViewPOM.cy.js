/// <reference types="cypress"/>

import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import FreestyleProjectPage from "../pageObjects/FreestyleProjectPage";
import Header from "../pageObjects/Header";


import genData from "../fixtures/genData";

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const freestyleProjectPage = new FreestyleProjectPage();
const header = new Header();

describe("US_16.002 | Dashboard > Create View", () => {
  let project = genData.newProject();
  let folder = genData.newProject();
  let view = genData.newProject();

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

  it("TC_16.002.02 Sort items in the view", () => {
    dashboardPage.clickAddViewLink()
                 .typeViewName(view.name)
                 .clickListViewRadio()
                 .clickCreateViewButton()
                 .clickJobCheckboxViewConfigure(project.name)
                 .clickJobCheckboxViewConfigure(folder.name)
                 .clickSubmitViewCreationButton()
    dashboardPage.getJobsFromNameColumnInTheView().then($elements => {
      const elementsArray = [...$elements].map(el => el.innerText.trim());
      const sortedArray = [...elementsArray].sort((a, b) => a.localeCompare(b));
      expect(elementsArray).to.deep.equal(sortedArray);
      });
    dashboardPage.clickSortJobsByNameButton();
    dashboardPage.getJobsFromNameColumnInTheView().then($elements => {
      const elementsArray = [...$elements].map(el => el.innerText.trim());
      const sortedArray = [...elementsArray].sort((a, b) => b.localeCompare(a));
      expect(elementsArray).to.deep.equal(sortedArray);
      });

  });

});
