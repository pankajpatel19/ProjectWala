import { Worker } from "bullmq";
import { sendMail } from "../utils/mail/nodeMailer";

export const workerQueue = new Worker(
  "emailQueue",
  async (job) => {
    // Process the job here
    console.log(`Processing job with id: ${job.id} and data:`, job.data);

    await sendMail(job.data.to, job.data.subject, job.data.text);
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  }
);
