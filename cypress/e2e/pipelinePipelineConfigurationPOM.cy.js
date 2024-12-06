/// <reference types="cypress"/>

import { faker } from "@faker-js/faker";
import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import PipelinePage from "../pageObjects/PipelinePage";
import BasePage from "../pageObjects/basePage";

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const pipelinePage = new PipelinePage();
const basePage = new BasePage();

describe('US_02.004 | Pipeline > Pipeline Configuration', () => {

  const randomItemName = faker.commerce.productName();
  const pipelineDescription = faker.lorem.paragraph();
  const newPipelineDescription = faker.lorem.paragraph()

    it('TC_02.004.03 | Modify the description field for the pipeline', () => {
      
      basePage.clickNewItemMenuLink()
      newJobPage.typeNewItemName(randomItemName)
                .selectPipelineProject()
                .clickOKButton()
      pipelinePage.typePipelineDescription(pipelineDescription)
                  .clickOnSaveBtn()
                  .clickConfigurePipelineMenuButton()
                  .clearPipelineDescriptionField()
                  .typePipelineDescription(newPipelineDescription)
                  .clickOnSaveBtn()
      
      pipelinePage.getPipelineJobDescription()
                  .should('contain.text', newPipelineDescription)
    })

    it('TC_02.004.02 | Pipeline > Pipeline Configuration >Enable/disable the project with the help of Enable/Disable toggle', () => { 
      basePage.clickNewItemMenuLink();
      newJobPage.typeNewItemName(randomItemName)
                .selectPipelineProject()
                .clickOKButton();
      pipelinePage
                .typePipelineDescription(pipelineDescription)
                .clickOnToggle()
                .clickOnSaveBtn()
                .getStatusDisabledText().should('exist')
                .and('have.css', 'color', 'rgb(254, 130, 10)'); 
  }) 

})
