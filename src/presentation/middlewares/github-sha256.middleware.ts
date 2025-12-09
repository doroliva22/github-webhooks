import type { Request, Response, NextFunction } from "express";
import crypto from "crypto";

export class GithubSha256Middleware {

    public static verifyGithubSignature(req: any, res: Response, next: NextFunction) {
        try {
            const signature = req.headers['x-hub-signature-256'] as string | undefined;
            const secret = process.env.GITHUB_WEBHOOK_SECRET;

            if (!signature || !secret) {
                return res.status(401).json({ error: 'Missing signature or secret' });
            }

            const rawBody = req.rawBody;
            if (!rawBody) {
                return res.status(400).json({ error: 'Missing raw body' });
            }

            // Compute HMAC using Node crypto
            const hmac = crypto.createHmac('sha256', secret);
            hmac.update(rawBody);
            const digest = `sha256=${hmac.digest('hex')}`;

            if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))) {
                return next();
            } else {
                return res.status(401).json({ error: 'Invalid signature' });
            }
        } catch (err) {
            console.error('Error verifying GitHub signature:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}