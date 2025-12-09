import type { GithubIssuePayload } from "../../interfaces/github-issue.interface.js";
import type { GitHubStarPayload } from "../../interfaces/github-start.interface.js";

export class GitHubService {
    constructor() { }

    onStar(payload: GitHubStarPayload): string {
        const { action, sender, repository } = payload;

        let message: string;

        if (action === "created") {
            message = `User ${sender.login} added a star to ${repository.full_name}`;
        } else if (action === "deleted") {
            message = `User ${sender.login} removed a star from ${repository.full_name}`;
        } else {
            message = `User ${sender.login} performed an unknown action on ${repository.full_name}`;
        }

        console.log(message);
        return message;
    }

    onIssue(payload: GithubIssuePayload): string {
        const { action, issue } = payload;
        let message = '';

        if (action === 'opened') {
            message = `An issue was opened with title: "${issue.title}"`;
        } else if (action === 'closed') {
            message = `An issue was closed by ${issue.user.login}`;
        } else {
            message = `Unhandled issue action: ${action}`;
        }

        console.log(message);
        return message;
    }
}
