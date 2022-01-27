import 'dotenv/config'
import express, { Express } from 'express';
import { retry } from 'ts-retry-promise';
import { CreateUserPublish } from './create-user-publish';


const functionWithFail = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        const error = true;
        if (error) {
            return reject('Unknown error');
        }
        return resolve('ok');
    });
}

const app: Express = express();

const createUserPublishFactory: CreateUserPublish = new CreateUserPublish('create_user', 'any');

app.use('/health', async (req, res, next) => {
    try {
        const result = await createUserPublishFactory.sendMessages({ name: 'Test message' });
        res.json({ status: 'ok', state: result });
    } catch (err) {
        next();
    }
})

app.use('/retry', async (req, res, next) => {
    try {
        const result = await retry(functionWithFail, { retries: 10 });
        res.json({ status: result });
    } catch (err) {
        next(err);
    }
})


app.listen(3001, () => {
    console.log('Listening on port 3001!');
    console.log('http://localhost:3001');
})