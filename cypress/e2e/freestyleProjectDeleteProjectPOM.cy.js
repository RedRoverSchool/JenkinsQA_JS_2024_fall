/// <reference types="cypress"/>

import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import FreestyleProjectPage from "../pageObjects/FreestyleProjectPage";

import configurePageData from "../fixtures/configurePageData.json"
import newJobPageData from "../fixtures/newJobPageData.json"


const dashBoardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const freestyleProjectPage = new FreestyleProjectPage();

describe('US_01.004 | FreestyleProject > Delete Project', () => {

    it("TC_01.004.05 | Cancel deletion", () => {
        dashBoardPage.clickNewItemMenuLink()
        newJobPage.addNewProjectName(newJobPageData.projectName)
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

})
