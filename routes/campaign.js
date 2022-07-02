const express = require("express");
const UserCampaign = require("../models/userCampaign");
const app = express();

app.post("/campaign", async (req, res) => {
  const userCampaign = new UserCampaign(req.body);
  try {
    await userCampaign.save();
    res.status(201).send(userCampaign);
  } catch (err) {
    res.status(400).send(err);
  }
});
app.patch("/campaign/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "campaignTitle",
    "typingDelay",
    "delayPageNavigate",
    "noOfProfileVisitsPerHour",
    "noOfProfileVisitsPerDay",
    "visitsBeforeDelay",
    "visitDelay",
    "limitSnoozeDays",
    "workingDaysArr",
    "workHrsPerDay",
    "userId",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const user = await UserCampaign.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});
app.delete("/campaign/:id", async (req, res) => {
  try {
    const user = await UserCampaign.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});
module.exports = app;
