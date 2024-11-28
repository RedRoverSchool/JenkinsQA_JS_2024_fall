/// <reference types="cypress"/>

import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import FreestyleProjectPage from "../pageObjects/FreestyleProjectPage";
import Header from "../pageObjects/Header";

import configurePageData from "../fixtures/configurePageData.json"
import newJobPageData from "../fixtures/newJobPageData.json"
import genData from "../fixtures/genData"


const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const freestyleProjectPage = new FreestyleProjectPage();
const header = new Header();

describe('US_01.004 | FreestyleProject > Delete Project', () => {

    let project = genData.newProject();

    it("TC_01.004.05 | Cancel deletion", () => {
        dashboardPage.clickNewItemMenuLink()
        newJobPage.typeNewItemName(newJobPageData.projectName)
                  .selectFreestyleProject()
                  .clickOKButton()
        freestyleProjectPage.typeJobDescription(configurePageData.projectDescription)
                            .clickSaveButton()
                            .clickDashboardBreadcrumbsLink()
        dashboardPage.clickJobName(newJobPageData.projectName)
        freestyleProjectPage.clickDeleteMenuItem()
                            .clickCancelButton()
                            .clickDashboardBreadcrumbsLink()
        dashboardPage.getAllJobNames().should('have.text', newJobPageData.projectName)
      });

      it("TC_01.004.11 | Verify user is able to cancel project deleting", () => {
        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(project.name)
                  .selectFreestyleProject()
                  .clickOKButton();
        freestyleProjectPage.clickSaveButton();
        header.clickJenkinsLogo();
        dashboardPage.hoverJobTitleLink()
                      .clickProjectChevronIcon(project.name)
                      .clickDeleteProjectDropdownMenuItem();

        dashboardPage.getCancelProjectDeletingButton().should("be.visible");

        dashboardPage.clickCancelDeletingButton()
          .getProjectName()
          .should("have.text", project.name)
          .and("be.visible");
      }); 
})
