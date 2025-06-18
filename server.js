const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const slackWebhookUrl = process.env.https://hooks.slack.com/services/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;

app.post('/notify', async (req, res) => {
  const message = req.body.message;
  if (!message) {
    return res.status(400).send('No message provided');
  }
  try {
    await axios.post(slackWebhookUrl, { text: message });
    res.status(200).send('Notification sent');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending notification');
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening on port ${listener.address().port}`);
});
