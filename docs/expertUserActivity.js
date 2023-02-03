/**
 * Gets a user activity token for a user's session.
 * Official docs here: https://success.mindtouch.com/Integrations/API/Authorization_Tokens/Use_a_Browser_API_Token_With_an_Integration
 * @param {string} browserTokenKey - an issued browser token to avoid CORS issues: https://success.mindtouch.com/Integrations/API/Authorization_Tokens/Get_a_Browser_API_Token
 * @param {string} siteUrl - as site url that the browser token was issued with.
 * @returns {string} a user activity token (including anonymous user)
 */
async function getUserActivityToken(browserTokenKey, siteUrl) {
  try {
    const response = await fetch(`${siteUrl}/users/current`, {
      headers: {
        "X-Deki-Token": browserTokenKey,
      },
    });
    const userResponse = await response.json();
    const sessionId = response.headers.get("X-Deki-Session");
    return `${userResponse.id}:${sessionId}`;
  } catch (error) {
    console.warn(
      "Unable to get token: Ensure its not a CORS issue by following our official docs: https://success.mindtouch.com/Integrations/API/Authorization_Tokens/Use_a_Browser_API_Token_With_an_Integration"
    );
    throw error;
  }
}

document.getElementById("ticketSubmissionButton").onclick(async (evt) => {
  // Received a browser token here: https://success.mindtouch.com/Integrations/API/Authorization_Tokens/Get_a_Browser_API_Token
  // this token can also be granted from a Server API Token: see here for token information. https://success.mindtouch.com/Integrations/API/Authorization_Tokens
  const browserTokenKey = "";
  const userActivityToken = await getUserActivityToken(
    browserTokenKey,
    "https://success.mindtouch.com"
  );
  alert(userActivityToken);
});
