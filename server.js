const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

app.use(express.json());
// Webhook URLを直接ここに書く
const slackWebhookUrl = 'https://hooks.slack.com/services/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';

async function checkTiketore() {
  try {
    const res = await axios.get('https://tiketore.com/tickets/search?perform_id=264379');
    const $ = cheerio.load(res.data);

    let found = false;
    $('button').each((_, btn) => {
      if ($(btn).text().includes('出品中')) found = true;
    });

    if (found) {
      await axios.post(slackWebhookUrl, { text: '✅ チケトレ：出品中のチケットが見つかりました！' });
      console.log('通知送信');
    } else {
      console.log('出品中なし');
    }
  } catch (error) {
    console.error('監視エラー:', error);
  }
}

// 1分ごとに監視実行
setInterval(checkTiketore, 60 * 1000);

// 最初の一回を即実行
checkTiketore();

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening on port ${listener.address().port}`);
});
