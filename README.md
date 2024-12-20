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

## Run the backend

### `cd backend` `npm install`

### run the backend server `node server.js`

## Setup

**Truffle Setup:**

- Install Truffle globally:

### `npm install -g truffle`

### `cd contracts`

### `npm install -g truffle`

## Deploy your contract
- Sepolia network was used.

### `cd contracts`

### `truffle compile`

### `truffle migrate --network sepolia`

## NOTE: Create a file .env and copy the .env.example file code inside and update it with your passkeys and infura_id

## Update the constantinfo.js inside the frontend component with your deployed smart contract address and the Nftmint.json with your ABI json

## Running the ke verse frontend

**Run the React frontend:**

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
