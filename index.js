import dotenv from 'dotenv';
import PubSubApiClient from 'salesforce-pubsub-api-client';
import subscriptions from './subscriptions.json' with { type: "json" };

async function run() {
    try {
        dotenv.config();

        const client = new PubSubApiClient({
            authType: 'oauth-client-credentials',
            loginUrl: process.env.SALESFORCE_LOGIN_URL,
            clientId: process.env.SALESFORCE_CLIENT_ID,
            clientSecret: process.env.SALESFORCE_CLIENT_SECRET
        });
        await client.connect();

        const subscribeCallback = (subscription, callbackType, data) => {
            switch (callbackType) {
                case 'event':
                    console.log(JSON.stringify(data));
                    // TODO something with event
                    break;
                case 'lastEvent':
                    console.log(`${subscription.topicName} - last of ${subscription.requestedEventCount} requested event on channel. Closing connection.`);
                    break;
                case 'end':
                    console.log('Client shut down gracefully.');
                    break;
            }
        };

        subscriptions.forEach(subscription => {
            client.subscribe(subscription, subscribeCallback, 3);
        });
    } catch (error) {
        console.error(error);
    }
}

run();