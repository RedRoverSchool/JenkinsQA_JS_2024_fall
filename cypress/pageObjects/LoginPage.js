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
      return this
   }
   
   typeLogin(userName) {
      this.getLogin().type(userName)
      return this
   }

   typePassword(password) {
      this.getPassword().type(password)
      return this
   }

   clickSignInButton() {
      this.getSignInButton().click()
      return this
   }

   verifyRedirectionToLoginPage() {
      cy.url().should("include", "/login");
      return this;
    }
}
export default LoginPage