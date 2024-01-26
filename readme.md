# Payment Integration Proof of Concept (Express)

This project is a Payment Integration Proof of Concept implemented with Express.js.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js
- npm (Node Package Manager)
- MYSQL database

### Install dependencies

npm install

### Set up Environment

Create a `.env` file in the project root

`TOKEN_SECRET:` A secret key used for signing and verifying authentication tokens.
Frontend Configuration:

`FRONTEND_URL:` The URL where the frontend application is hosted.
Ngrok Proxy Configuration:

`BACKEND_NGROK_PROXY:` The proxy URL used for routing requests to the backend during development (e.g., when using Ngrok).

MySQL Configuration

`MYSQL_HOST:` The MySQL database host address.
`MYSQL_USER:` The MySQL database username for authentication.
`MYSQL_PASSWORD:` The password associated with the MySQL database user.
`MYSQL_DATABASE:` The name of the MySQL database to be used.

Mollie API Configuration

`MOLLIE_API:` The base URL for the Mollie API./
`MOLLIE_API_KEY:` The API key for authenticating requests to the Mollie API.

### Database

a database seeding script that will execute on first run is included, disable seeding in database/database.js after first run.

Two users are created:

Name: John, Password: Password1

Name: Jack, Password: Paswoord123

use these to login


### Run project

node server
