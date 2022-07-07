const express = require("express");
const UserCampaign = require("../models/userCampaign");
const app = express();
const auth = require("../middleware/auth");

app.post("/campaign", auth, async (req, res) => {
  const userId = new UserCampaign({
    ...req.body,
    userId: req.user._id,
  });

  try {
    await userId.save();
    res.status(201).send(userId);
  } catch (e) {
    res.status(400).send(e);
  }
});
app.patch("/campaign/:id", auth, async (req, res) => {
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
    const user = await UserCampaign.findOne(
      { _id: req.params.id, userId: req.user._id },
      {}
    );

    if (!user) {
      return res.status(404).send();
    }
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.delete("/campaign/:id", auth, async (req, res) => {
  try {
    const user = await UserCampaign.findByIdAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = app;
