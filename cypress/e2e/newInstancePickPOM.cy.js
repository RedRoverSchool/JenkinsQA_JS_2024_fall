/// <reference types="cypress" />
import NewJobPage from "../pageObjects/NewJobPage";
import DashboardPage from "../pageObjects/DashboardPage";
import {newInstance} from "../fixtures/newJobPageData.json"
import Header from "../pageObjects/Header";

describe('Checking parametrization', ()=>{
    const dashboardPage = new DashboardPage()
    const newJobPage = new NewJobPage()
    const header = new Header()
  
    newInstance.forEach((instanceType, ind)=>{
    it(`Checks the ${instanceType} page contains search field`, function(){
        dashboardPage.clickNewItemMenuLink();
        newJobPage.typeNewItemName(instanceType + ind)
        cy.get('label').contains(instanceType).click()
        newJobPage.clickOKButton()
                  .clickSaveButton()
        header.getSearchField().should('be.visible')
        
        

    })
})
})