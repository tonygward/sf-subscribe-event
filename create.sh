# npm packages
npm init -y
npm install --save dotenv
npm install --save salesforce-pubsub-api-client

# exclude node_modules from git
touch .gitignore
echo "node_modules" >> .gitignore
echo "package-lock.json" >> .gitignore

# Create .env file
touch .env
echo "SALESFORCE_LOGIN_URL=" >> .env
echo "SALESFORCE_CLIENT_ID=" >> .env
echo "SALESFORCE_CLIENT_SECRET=" >> .env

# subscriptions file
touch subscriptions.json
echo "[" >> subscriptions.json
echo "  \"/event/LoginEventStream\"," >> subscriptions.json
echo "  \"/event/LoginAsEventStream\"" >> subscriptions.json
echo "]" >> subscriptions.json

# new file
touch index.js
