class LoginPage
{
   getSessionCookie(cookieName) {
      return cy.getCookies().then((cookies) => {
        return (cookies.find((cookie) => cookie.name.includes(cookieName))).value;
      });
   }
   getHeader = () => cy.get('h1').contains('Sign in to Jenkins');
   getSignInButton = () => cy.get('button.jenkins-button--primary');   
}
export default LoginPage