async function sendMessageToSlack(message) {
  //GET ENDPOINT FROM SLACK.COM
  const slackEndpoint = '';
  try {
    const response = await fetch(slackEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: message })
    });
    if (response.ok) {
      console.log('Message sent to Slack');
    } else {
      throw new Error(`Failed to send message to Slack. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error sending message to Slack:', error.message);
  }
}

module.exports = sendMessageToSlack;
