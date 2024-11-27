/// <reference types="cypress"/>

import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import FreestyleProjectPage from "../pageObjects/FreestyleProjectPage";
import Header from "../pageObjects/Header";

import configurePageData from "../fixtures/configurePageData.json"
import newJobPageData from "../fixtures/newJobPageData.json"
import genData from "../fixtures/genData"


const dashBoardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const freestyleProjectPage = new FreestyleProjectPage();
const header = new Header();

describe('US_01.004 | FreestyleProject > Delete Project', () => {
 
  let project = genData.newProject()

    it("TC_01.004.05 | Cancel deletion", () => {
        dashBoardPage.clickNewItemMenuLink()
        newJobPage.typeNewItemName(newJobPageData.projectName)
                  .selectFreestyleProject()
                  .clickOKButton()
        freestyleProjectPage.typeJobDescription(configurePageData.projectDescription)
                            .clickSaveButton()
                            .clickDashboardBreadcrumbsLink()
        dashBoardPage.clickJobName(newJobPageData.projectName)
        freestyleProjectPage.clickDeleteJobButton()
                            .clickCancelButton()
                            .clickDashboardBreadcrumbsLink()
        dashBoardPage.getAllJobNames().should('have.text', newJobPageData.projectName)
      });

      it("TC_01.004.11 | Verify user is able to cancel project deleting", () => {
        dashBoardPage.clickNewItemMenuLink();
        newJobPage.addNewProjectName(project.name);
        newJobPage.selectFreestyleProject();
        newJobPage.clickOKButton();
        freestyleProjectPage.clickSaveButton();
        header.clickJenkinsLogo();
        dashBoardPage.mouseOverJobTitle(project.name);
        dashBoardPage.clickProjectDropdownMenu();
        dashBoardPage.clickDeleteProjectFromProjectDropdownMenu();

        dashBoardPage.getCancelProjectDeletingButton().should("be.visible");
        dashBoardPage.cancelProjectDeleting();
        dashBoardPage
          .getProjectName()
          .contains(project.name)
          .should("be.visible");
      }); 

})
