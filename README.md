## Kuverse local run

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup](#setup)
- [Running the Project](#running-the-project)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later)
- [Truffle](https://www.trufflesuite.com/truffle)

## Installation

**Clone the repository:**

### `git clone https://github.com/Tolujoh-n/kuverse-test-toluwase.git`

`cd kuverse-test-toluwase`

In the project directory, you can run:

### `npm install --legacy-peer-deps`

## Setup

**Truffle Setup:**

- Install Truffle globally:

### `npm install -g truffle`

### `cd contracts`

### `npm install -g truffle`

- Compile and deploy the smart contracts:

### `truffle compile`

### `truffle migrate --network theta`

- Once the contract is compile and it's deploy replace the contract address in constant.js file with your deployed contract address (../src/components/Constant.js)
- Copy the ABI compile from the smart contract directory (../genius/build/contracts/QuizPlatform.json) and paste to the src ABI file (../src/components/QuizPlatform.json)
  This is need to be done because the ABI need to be withing the src folder for react to allow us use it without errors

**Environment Variables:**

- Create a `.env` file in the root of the Geniusmind-theta folder directories
- Copy the Enviromental Variable in the `.env.example` file and paste it to the `.env` file and provide the key values to respective Environment Variables
- Replace the MNEMONIC in the `.env` file in the root of the genius folder (The smart contract folder) directories (../genius/.env) with your testing wallet MNEMONIC

## Running the Project

**Run the React frontend:**

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

**Run the Geniusmind WebApp on Theta EdgeStore locally:**

- Follow the instructions provided in the Theta [EdgeStore documentation Serving Web Apps](https://github.com/thetatoken/theta-edge-store-demos/tree/main/demos/website) Apply the same for project locally
- To visit the site, open a browser and navigate to http://127.0.0.1:7001/index.html
