const userModel = require("../models/user.model");

async function getProfile(req, res) {
  try {
    const user = await userModel.findById(req.user.id).select("-password");

    res.status(200).json(user);

    console.log("REQ.USER:", req.user);
  } catch (error) {
    console.error("PROFILE ERROR: ", error);
    res.status(500).json({ message: "Error fetching profile" });
  }
}

module.exports = { getProfile };
