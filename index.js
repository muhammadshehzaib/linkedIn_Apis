const express = require("express");
const app = express();
const mongoose = require("./db/mongoose");
const user = require("./routes/user");
const campaigns = require("./routes/campaign");

const PORT = 3000;

app.use(express.json());
app.use(user);
app.use(campaigns);

app.listen(PORT, () => {
  console.log("Server is up and running on port " + PORT);
});
const UserCampaign = require("./models/userCampaign");
const main = async () => {
  // find user by the usercampaign
  const usercampaign = await UserCampaign.findById("62c689c1d87cc817f15cbf39");
  await usercampaign.populate("userId");
};

main();
