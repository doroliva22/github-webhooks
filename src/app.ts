import express from 'express';
import { envs } from './config/envs.js';
import { GithubController } from './presentation/github/GithubController.js';
import { GithubSha256Middleware } from './presentation/middlewares/github-sha256.middleware.js';

(() => {
    main();
})();

function main() {
    const app = express();

    // Capture raw body for GitHub webhook signature verification
    app.use(express.json({
        verify: (req: any, res, buf) => {
            req.rawBody = buf;
        }
    }));

    const controller = new GithubController();

    // GitHub webhook route
    app.post(
        '/api/github',
        GithubSha256Middleware.verifyGithubSignature,
        controller.webhookHandler
    );

    app.listen(envs.PORT, () => {
        console.log(`App running on port ${envs.PORT}`);
    });
}
