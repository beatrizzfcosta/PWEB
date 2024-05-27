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
}

module.exports = {checkEmail, checkUsername};
