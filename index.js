const express = require("express");
const UserCampaign = require("./models/userCampaign");
const Leads = require("./models/lead");
const app = express();
const mongoose = require("./db/mongoose");
const user = require("./routes/user");
const campaigns = require("./routes/campaign");
const lead = require("./routes/leads");

const PORT = 3000;

app.use(express.json());
app.use(user);
app.use(campaigns);
app.use(lead);

app.listen(PORT, () => {
  console.log("Server is up and running on port " + PORT);
});
