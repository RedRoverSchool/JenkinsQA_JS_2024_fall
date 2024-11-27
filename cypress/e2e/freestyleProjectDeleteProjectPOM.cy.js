/// <reference types="cypress"/>

import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import {projectDescription} from "../fixtures/configurePageData.json"
import ProjectConfigure from "../pageObjects/ProjectConfigurePage";
import JobPage from "../pageObjects/JobPage";
import {getAllProjectNames} from "../pageObjects/DashboardPage"
import {projectName} from "../fixtures/newJobPageData.json"

const dashBoardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const projectConfigure = new ProjectConfigure();
const jobPage = new JobPage();

describe('US_01.004 | FreestyleProject > Delete Project', () => {

    it("RF_01.004.05 | FreestyleProject > Delete Project | Cancel deletion", () => {
        dashBoardPage.clickNewItemMenuLink()
        newJobPage.addNewProjName(projectName)
                  .pickFreeStlPrj()
                  .okBtnClick()
        projectConfigure.addNewProjDescription(projectDescription)
                        .clickSaveBtn()
        jobPage.clickDashboardLink()
        dashBoardPage.clickProjectName(projectName)
        jobPage.clickDeleteProjectButton()
               .clickCancelButton()
               .clickDashboardLink()
        dashBoardPage.getAllProjectNames().should('have.text', projectName)
      });

})