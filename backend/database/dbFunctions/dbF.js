

const User = require("../../models/user/user");

async function checkEmail(email) {
  try {
    const user = await User.findOne({ email: email });
    return user ? true : false;
  } catch (error) {
    console.error("Error checking email:", error);
    throw error;
  }
}

async function checkUsername(username) {
  try {
    const user = await User.findOne({ username: username });
    return user ? true : false;
  } catch (error) {
    console.error("Error checking username:", error);
    throw error;
  }
} function extractUserIdFromToken(token) {

  if (!token) {
    return null;
  }

  try {
    const [, payloadBase64] = token.split('.');
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    return payload.usrName;
  } catch (error) {
    console.error('Error extracting user ID from token:', error);
    return null;
  }
}
module.exports = {checkEmail, checkUsername,extractUserIdFromToken};
