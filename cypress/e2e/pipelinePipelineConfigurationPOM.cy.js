/// <reference types="cypress"/>

import { faker } from "@faker-js/faker";
import DashboardPage from "../pageObjects/DashboardPage";
import NewJobPage from "../pageObjects/NewJobPage";
import PipelinePage from "../pageObjects/PipelinePage";
import BasePage from "../pageObjects/basePage";

const dashboardPage = new DashboardPage();
const newJobPage = new NewJobPage();
const pipelinePage = new PipelinePage();
const BasePage = new BasePage();

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

})
