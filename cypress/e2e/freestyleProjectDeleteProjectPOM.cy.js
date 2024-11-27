/// <reference types="cypress"/>

import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import {projectDescription} from "../fixtures/configurePageData.json"
import ProjectConfigure from "../pageObjects/ProjectConfigurePage";
import JobPage from "../pageObjects/JobPage";
import {getAllProjectNames} from "../pageObjects/DashboardPage"
import {projectName} from "../fixtures/newJobPageData.json"
import FreestyleProjectPage from "../pageObjects/FreestyleProjectPage";

const dashBoardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const projectConfigure = new ProjectConfigure();
const jobPage = new JobPage();
const freestyleProjectPage = new FreestyleProjectPage();

describe('US_01.004 | FreestyleProject > Delete Project', () => {

    it("RF_01.004.05 | Cancel deletion", () => {
        dashBoardPage.clickNewItemMenuLink()
        newJobPage.addNewProjectName(projectName)
                  .selectFreestyleProject()
                  .clickOKButton()
        projectConfigure.addProjectDescription(projectDescription)
                        .clickSaveButton()
        freestyleProjectPage.clickDashboardLink()
        dashBoardPage.clickProjectName(projectName)
        freestyleProjectPage.clickDeleteProjectButton()
                            .clickCancelButton()
                            .clickDashboardLink()
        dashBoardPage.getAllProjectNames().should('have.text', projectName)
      });

})
