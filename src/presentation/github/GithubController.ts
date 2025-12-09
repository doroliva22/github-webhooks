import type { Request, Response } from "express";
import { GitHubService } from "../services/github.service.js";

export class GithubController {
    private readonly gitHubService: GitHubService;

    constructor() {
        this.gitHubService = new GitHubService();
    }

    webhookHandler = (req: Request, res: Response) => {
        const githubEvent = req.header('x-github-event') ?? 'unknown';
        const payload = req.body;
        let message = '';

        switch (githubEvent) {
            case 'star':
                message = this.gitHubService.onStar(payload);
                break;

            case 'issues':
                message = this.gitHubService.onIssue(payload);
                break;

            default:
                message = `Unknown event: ${githubEvent}`;
                console.log(message);
        }

        console.log({ message });
        res.status(200).send('Accepted');
    }
}
