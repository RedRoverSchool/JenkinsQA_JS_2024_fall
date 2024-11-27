class LoginPage
{
   getSessionCookie(cookieName) {
      return cy.getCookies().then((cookies) => {
        return (cookies.find((cookie) => cookie.name.includes(cookieName))).value;
      });
   }

   checkSessionCookieChanged(initialCookieValue, cookieName) {
      this.getSessionCookie(cookieName).then((updatedCookieValue) => {
        expect(initialCookieValue).not.to.equal(updatedCookieValue);
      });
   }
}
export default LoginPage