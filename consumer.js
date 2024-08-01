import { SQSClient, ReceiveMessageCommand } from "@aws-sdk/client-sqs"; // AWS SDK v3 for SQS
import AWS from 'aws-sdk'; // AWS SDK v2 for SSM

const config = {
  region: "us-east-1",
};

// Initialize SQS Client (v3)
const sqsClient = new SQSClient(config);

// Initialize SSM Client (v2)
const ssm = new AWS.SSM(config);

const queueUrl = "https://sqs.us-east-1.amazonaws.com/058264284586/MyNewQueue";

// Function to receive messages from SQS
const receiveMessage = async () => {
  try {
    const command = new ReceiveMessageCommand({
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 20,
    });
    const response = await sqsClient.send(command);

    if (response.Messages) {
      for (const message of response.Messages) {
        console.log("Received message:", message.Body);
      }
    }
  } catch (error) {
    console.error("Error receiving message:", error);
  } finally {
    setTimeout(receiveMessage, 1000);
  }
}
// Start receiving messages
receiveMessage();
