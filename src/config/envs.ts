import 'dotenv/config';
import env from 'env-var';

export const envs = {
    PORT: env.get('PORT').required().asIntPositive(),
    SECRET_TOKEN: env.get('SECRET_TOKEN').required().asString()
};