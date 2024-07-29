import { Octokit } from "@octokit/rest";
import * as dotenv from "dotenv";

dotenv.config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export const compareBranches = async (repo: string, baseBranch: string, compareBranch: string) => {
  try {
    const { data } = await octokit.repos.compareCommits({
      owner: repo.split("/")[0],
      repo: repo.split("/")[1],
      base: baseBranch,
      head: compareBranch,
    });
    return data;
  } catch (error) {
    console.error("Error comparing branches:", error);
    throw error;
  }
};
