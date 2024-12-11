class LoginPage
{
   getHeader = () => cy.get('h1').contains('Sign in to Jenkins');
   getSignInButton = () => cy.get('button.jenkins-button--primary');
   getLogin = () => cy.get('#j_username');
   getPassword = () => cy.get('#j_password'); 

   getSessionCookie(cookieName) {
      return cy.getCookies().then((cookies) => {
        return (cookies.find((cookie) => cookie.name.includes(cookieName))).value;
      });
   }
   
   typeLogin(userName) {
      this.getLogin().type(userName)
   }

   typePassword(password) {
      this.getPassword().type(password)
   }

   clickSignInButton() {
      this.getSignInButton().click()
   }

   verifyRedirectionToLoginPage() {
      cy.url().should("include", "/login");
      return this;
    }
}
export default LoginPage