import { compareBranches } from "./githubClient";
import { sendEmailNotification } from "./emailNotifier";
import * as dotenv from "dotenv";
import schedule from "node-schedule";

dotenv.config();

const REPO = process.env.GITHUB_REPO!;
const BASE_BRANCH = "main";
const COMPARE_BRANCH = "feature-branch";

const checkForChanges = async () => {
  try {
    const result = await compareBranches(REPO, BASE_BRANCH, COMPARE_BRANCH);
    if (result.status === "identical") {
      await sendEmailNotification(
        process.env.EMAIL_ADDRESS!,
        "No Changes in Repo",
        `There are no changes between ${BASE_BRANCH} and ${COMPARE_BRANCH}.`
      );
    } else {
      await sendEmailNotification(
        process.env.EMAIL_ADDRESS!,
        "Changes Detected in Repo",
        `There are changes between ${BASE_BRANCH} and ${COMPARE_BRANCH}.`
      );
    }
  } catch (error) {
    console.error("Error in checking branches or sending email:", error);
  }
};
// console.log('starting service...')
// console.log('running initial check...')
checkForChanges()
// Schedule job to run daily at midnight
const [hour, minute] = process.env.EMAIL_NOTIFICATION_TIME!.split(":").map(Number);
schedule.scheduleJob({ hour, minute }, checkForChanges);

